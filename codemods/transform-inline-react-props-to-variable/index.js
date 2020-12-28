/**
 * THIS ONLY WORK WITH OBJECT OR ARRAY WITH ELEMENTS ARE LITERAL (string, number...)
 */
import fs from 'fs';

const toUppercaseFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.slice(1);

const toLowercaseFirstLetter = str =>
  str.charAt(0).toLowerCase() + str.slice(1);

const insertAfter = (arr, condition, newElems) => {
  let result = [];
  if (Array.isArray(arr) && Array.isArray(newElems)) {
    arr.forEach(elem => {
      result = result.concat([elem]);
      if (condition(elem)) {
        result = result.concat(newElems);
      }
    });
  }
  return result;
};

const transform = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  if (options.writeAST) {
    fs.writeFileSync(
      `${fileInfo.path}.ast.json`,
      JSON.stringify(root, null, 2),
    );
  }

  const checkIfOutermostJSXElementAttribute = jsxAttributePath => {
    return (
      j(jsxAttributePath)
        .closest(j.JSXElement)
        .closest(j.JSXElement)
        .size() === 0
    );
  };

  const isLiteralOrExpressionEqual = (expOrLit, anotherExpOrLit) => {
    if (expOrLit.type !== anotherExpOrLit.type) {
      return false;
    }
    if (expOrLit.type === 'Literal') {
      return expOrLit.value === anotherExpOrLit.value;
    }
    if (expOrLit.type === 'ArrayExpression') {
      return isArrayExpressionsEqual(expOrLit, anotherExpOrLit);
    }
    if (expOrLit.type === 'ObjectExpression') {
      return isObjectExpressionsEqual(expOrLit, anotherExpOrLit);
    }
    return false;
  }

  const isEveryKeyInOneObjectExpressionAlsoInAnother = (objectExression, anotherObjectExpression) => (
    objectExression.properties.every(
      property =>
        anotherObjectExpression.properties.findIndex(
          p =>
            p.key.name === property.key.name &&
            isLiteralOrExpressionEqual(p.value, property.value),
        ) !== -1,
    )
  );

  const isObjectExpressionsEqual = (
    objectExression,
    anotherObjectExpression,
  ) => {
    if (
      objectExression.properties.length !==
      anotherObjectExpression.properties.length
    ) {
      return false;
    }
    return (
      isEveryKeyInOneObjectExpressionAlsoInAnother(objectExression, anotherObjectExpression) &&
      isEveryKeyInOneObjectExpressionAlsoInAnother(anotherObjectExpression, objectExression)
    );
  };

  const isArrayExpressionsEqual = (arrayExpression, anotherArrayExpression) => {
    if (
      arrayExpression.elements.length !== anotherArrayExpression.elements.length
    ) {
      return false;
    }
    if (
      arrayExpression.elements.every((elem, index) => {
        const e = anotherArrayExpression.elements[index];
        return isLiteralOrExpressionEqual(e, elem);
      })
    ) {
      return true;
    }
    return false;
  };

  const isValidExpression = expressionNode => {
    if (expressionNode.type === 'ObjectExpression') {
      return expressionNode.properties.every(property => {
        const { type, key, value } = property;
        if (type !== 'Property' || key.type !== 'Identifier') {
          return false;
        }
        if (value.type === 'Literal') {
          return true;
        }
        return isValidExpression(value);
      });
    }
    if (expressionNode.type === 'ArrayExpression') {
      return expressionNode.elements.every(element => {
        const { type } = element;
        if (type === 'Literal') {
          return true;
        }
        return isValidExpression(element);
      });
    }
    return false;
  };

  let propertyNameToInsertAfter = '';
  let changed = false;

  const replaceExpressionInAttributeWithVariable = needToChangedJSXAttributes => {
    needToChangedJSXAttributes.replaceWith(needToChangedJSXAttributePath => {
      const needToChangedJSXAttributeNode = needToChangedJSXAttributePath.node;
      const isOutermostJSXElementAttribute = checkIfOutermostJSXElementAttribute(
        needToChangedJSXAttributePath,
      );

      const classBody = j(needToChangedJSXAttributePath).closest(j.ClassBody);
      if (classBody.size() === 1) {
        let newClassPropertyName = '';

        classBody.replaceWith(classBodyPath => {
          const classBodyNode = classBodyPath.node;

          // check there is a variable with the same value
          const theSameClassPropertyThatAlreadyExist = j(classBodyPath)
            .find(j.ClassProperty)
            .filter(maybeTheSameClassPropertyPath => {
              const propertyValue = maybeTheSameClassPropertyPath.node.value;
              const jsxAttributeExpressionValue =
                needToChangedJSXAttributeNode.value.expression;
              if (
                propertyValue &&
                jsxAttributeExpressionValue &&
                propertyValue.type === jsxAttributeExpressionValue.type
              ) {
                const type = propertyValue.type;
                if (type === 'ObjectExpression') {
                  return isObjectExpressionsEqual(
                    propertyValue,
                    jsxAttributeExpressionValue,
                  );
                }
                if (type === 'ArrayExpression') {
                  return isArrayExpressionsEqual(
                    propertyValue,
                    jsxAttributeExpressionValue,
                  );
                }
                return false;
              }
            });

          if (theSameClassPropertyThatAlreadyExist.size() !== 0) {
            const theSameClassPropertyThatAlreadyExistPath = theSameClassPropertyThatAlreadyExist.get(
              0,
            );
            const theSameClassPropertyThatAlreadyExistNode =
              theSameClassPropertyThatAlreadyExistPath.node;
            newClassPropertyName =
              theSameClassPropertyThatAlreadyExistNode.key.name;
            return classBodyNode;
          }

          let baseClassPropertyName = needToChangedJSXAttributeNode.name.name;
          if (!isOutermostJSXElementAttribute) {
            const jsxOpeningElementName = j(needToChangedJSXAttributePath)
              .closest(j.JSXOpeningElement)
              .get(0).node.name.name;
            baseClassPropertyName = `${toLowercaseFirstLetter(
              jsxOpeningElementName,
            )}${toUppercaseFirstLetter(baseClassPropertyName)}`;
          }
          newClassPropertyName = baseClassPropertyName;
          let identifierNumber = 0;

          // check if variable name already existed
          while (true) {
            if (
              j(classBodyPath)
                .find(j.ClassProperty, {
                  key: {
                    name: newClassPropertyName,
                  },
                })
                .size() === 0
            ) {
              break;
            }
            propertyNameToInsertAfter = newClassPropertyName;
            identifierNumber += 1;
            newClassPropertyName = baseClassPropertyName + identifierNumber;
          }

          const newClassProperty = j.classProperty(
            j.identifier(newClassPropertyName),
            needToChangedJSXAttributeNode.value.expression,
            null,
            false,
          );

          let newBodyOfClassBodyAfterAddNewClassProperty = [];
          if (propertyNameToInsertAfter) {
            newBodyOfClassBodyAfterAddNewClassProperty = insertAfter(
              classBodyNode.body,
              bodyPart =>
                bodyPart.type === 'ClassProperty' &&
                bodyPart.key.name === propertyNameToInsertAfter,
              [newClassProperty],
            );
          } else {
            newBodyOfClassBodyAfterAddNewClassProperty = [
              newClassProperty,
            ].concat(classBodyNode.body);
          }

          return {
            ...classBodyNode,
            body: newBodyOfClassBodyAfterAddNewClassProperty,
          };
        });

        propertyNameToInsertAfter = newClassPropertyName;
        changed = true;
        return {
          ...needToChangedJSXAttributeNode,
          value: j.jsxExpressionContainer(
            j.memberExpression(
              j.thisExpression(),
              j.identifier(newClassPropertyName),
            ),
          ),
        };
      }
      return needToChangedJSXAttributeNode;
    });
  };

  const needToChangedJSXObjectAttributes = root
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
      },
      value: {
        type: 'JSXExpressionContainer',
        expression: {
          type: 'ObjectExpression',
        },
      },
    })
    .filter(needToChangedJSXObjectAttributePath =>
      isValidExpression(
        needToChangedJSXObjectAttributePath.node.value.expression,
      ),
    );

  const needToChangedJSXArrayAttributes = root
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
      },
      value: {
        type: 'JSXExpressionContainer',
        expression: {
          type: 'ArrayExpression',
        },
      },
    })
    .filter(needToChangedJSXArrayAttributePath =>
      isValidExpression(
        needToChangedJSXArrayAttributePath.node.value.expression,
      ),
    );

  replaceExpressionInAttributeWithVariable(needToChangedJSXObjectAttributes);
  replaceExpressionInAttributeWithVariable(needToChangedJSXArrayAttributes);

  if (changed) {
    return root.toSource();
  }
  return null;
};

export default transform;
