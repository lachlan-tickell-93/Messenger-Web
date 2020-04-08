import ActionCable from 'actioncable'

export default class SocketConnection{
    cable;
    constructor(cableUrl: string) {
        this.cable = ActionCable.createConsumer(cableUrl);
    }

    subscribeUser = (userId: number, callback) => {
        this.cable.subscriptions.create({ channel: "UserChannel", user_id: userId }, {
            connected : () => {},
            disconnected : () => {},
            received : (data) => {
                callback(data);
            }
        });
    }

    subscribeConversation = (conversationId: number, callback) => {
        this.cable.subscriptions.create({ channel: "ConversationChannel", conversation_id: conversationId }, {
            connected : () => {console.log("Connected")},
            disconnected : () => {},
            received : (data) => {
                callback(data);
            }
          });
    }
}

// function ChatConnection(senderId, callback) {
// //   let access_token = localStorage.getItem(ACCESS_TOKEN_NAME)
// //   let client = localStorage.getItem(CLIENT_NAME)

// let access_token = "asd";
// let client = "lachlan.tickell.93@gmail.com";
// let api_url = "http://localhost:3000";

//   var wsUrl = 'ws://' + api_url + '/cable'
//   wsUrl += '?access-token=' + access_token + '&client=' + client

//   this.senderId = senderId
//   this.callback = callback

//   this.connection = ActionCable.createConsumer(wsUrl)
//   this.roomConnections = []
// }

// ChatConnection.prototype.talk = function(message, roomId) {
//   let roomConnObj = this.roomConnections.find(conn => conn.roomId == roomId)
//   if (roomConnObj) {
//     roomConnObj.conn.speak(message)
//   } else {
//     console.log('Error: Cannot find room connection')
//   }
// }

// ChatConnection.prototype.openNewRoom = function(roomId) {
//   if (roomId !== undefined) {
//     this.roomConnections.push({roomId: roomId, conn: this.createRoomConnection(roomId)})
//   }
// }

// ChatConnection.prototype.disconnect = function() {
//   this.roomConnections.forEach(c => c.conn.consumer.connection.close())
// }

// ChatConnection.prototype.createRoomConnection = function(room_code) {
//   var scope = this
//   return this.connection.subscriptions.create({channel: 'RoomChannel', room_id: room_code, sender: scope.senderId}, {
//     connected: function() {
//       console.log('connected to RoomChannel. Room code: ' + room_code + '.')
//     },
//     disconnected: function() {},
//     received: function(data) {
//       if (data.participants.indexOf(scope.senderId) != -1) {
//         return scope.callback(data)
//       }
//     },
//     speak: function(message) {
//       return this.perform('speak', {
//         room_id: room_code,
//         message: message,
//         sender:  scope.senderId
//       })
//     }
//   })
// }

// export default ChatConnection