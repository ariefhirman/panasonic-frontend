export const publishMessage = (topic, message, resMessage) => {
  client.publish(topic, message, { qos: 1, retain: false }, function (error) {
    if (error) {
      console.log(error)
    } else {
      console.log('Message Published: ' + resMessage)
    }
  })
}