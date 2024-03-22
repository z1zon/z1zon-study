# notification system
- mobile push notification, sms, email, etc...
- soft real-time system
- support device
  - ios device, aos device, laptop, desktop
- can set opt-out

### IOS push
- provider: generate notification, send to APNS
  - device token: device unique identifier
  - payload: json dictionary with notification contents
- APNS: apple push notification service
  - send push notification to ios device

### AOS push
- provider: similar to IOS push provider
- FCM: firebase cloud messaging
  - similar to APNS

### SMS
- normally use third-party service, twilio or nexmo

### Email
- normally use third-party service, sendgrid or mailchimp

## system design (system components)

### get contacts
- need mobile device token, phone number, email, etc info...
- app install or register account after save db

### 1 to n service
- this service is microservice or cronjob or distributed system

### notification system
- this system is core of send/receive process

### third party service
- this service role is actually send notification

### device
- receive notification

## problems & solution

### problems
- SPOF (single point of failure)
- extensibility
- performance bottleneck

### solutions
- detach db and cache from notification system's main server
- add notification server and use HPA
- disconnects from system components through use message queue