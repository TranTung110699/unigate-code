export const START_MEDIA_PLAYER = 'START_MEDIA_PLAYER';
export const STOP_MEDIA_PLAYER = 'STOP_MEDIA_PLAYER';
export const ADD_SPEED_RECOGNITION_RESULT = 'ADD_SPEED_RECOGNITION_RESULT';

export function playerStart(playerId) {
  return { type: START_MEDIA_PLAYER, playerId };
}

export function playerStop(playerId) {
  return { type: STOP_MEDIA_PLAYER, playerId };
}

export function addSpeedRecognitionResult(playerId, result) {
  return { type: ADD_SPEED_RECOGNITION_RESULT, playerId, result };
}
