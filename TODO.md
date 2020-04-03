DONE create user order based on trick winnner
find out why deck is not empty in history after deal action
shuffle using seed
seed is part of config
accept config as init action payload
GameServer / GameClient
  - game client send action to server, awaits response (broadcast is success or direct response if failure)
  - game server receives action, tries to apply it internally, if it worked, broadcast action to everybody, otherwise return error to origin