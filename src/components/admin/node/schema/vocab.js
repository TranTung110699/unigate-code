const user = {
  id: 'string',
  iid: 'string',
  name: 'string',
  avatar: 'string',
};

export const treeVocabSchema = {
  title: 'Example Vocab Schema',
  type: 'object',
  properties: {
    iid: 'string',
    id: 'string',
    ntype: 'string',
    avatar: 'string',
    name: 'string',
    vname: 'string',
    // tracking_line: 'array',
    school: 'string',
    vid_gb: 'string', // vocab gb vid
    vid_us: 'string',
    player: 'string',
    inlineText: 'string',
    isVocabQuestion: 'boolean',
    audio: 'array',
    lvid: 'array',
    lexamples: 'array',
    u_audio: 'string',
    examples: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: 'string',
          vname: 'string',
        },
      },
    },
    type: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    pid: 'string',
    status: 'string',
    ts: 'integer',
    skill: 'string',
    u: {
      type: 'object',
      properties: user,
      required: false,
    },
    isMetadata: 'boolean',
    speaker: {
      name: 'string',
      avatar: 'string',
    },
  },
  required: ['id', 'iid', 'ntype'],
};
