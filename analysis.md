The product to be resolved is a simple alert system.

Steps to guide all the cases:
1. The console adapter may be able to configure service to alert.

   The Console Interface should provide an API to (CRUD): 
    - Create Service
    - List Services
    - Modify Service
    - Delete Service

    A service should have:
    - Service Identifier (ServiceId)

2. Once the service is configured, the Alert Interface should provide an API to:
    - Start a alert to a service

    To be more detail we will supose that the alert will have:
    - ServiceId
    - Alert description

3. The alert receive make the logic send an email and/or sms.
    - We need a SMS API
    - We need a email API

    To know to who will be sent we access the Escalation Policy Service:
    - We need to get the list of recipients 

    We need to send on the email/sms an identifier to the current alert service
    - We need a service alert level identifier

4. To ensure that we have a response from the sms/email just sent we will create a timer that will run another job if there is no reply after 15 min.
    - We need a Timer API

5. To check all steps, we supose that the first notification is ignored and the timer times out. We need a system to go to the next level and notify them.
   - We need a way to run a timer to scale up the notification and repeat from the step 3 only the first time.

6. We suppose that the second time the notification is received, and the technical fix the problem and can be close the issue.
   The problems tells that the Pager Web Console should be able to this, so Console Interface should have:
    - Create Service
    - List Services
    - Modify Service
    - Delete Service
    - Close a alert (with a alert level identifier) `NEW`



<br>

# Questions
1. If the alert scales to the next policy, will be the first-level technical be able to close them? \
   or should be the top-level notified the only ones to be able to close them?\
   or even could be possible that an alert should be closed by all technicians notified?\
   or even the should be closed only by the all technicians on the last-level notified?

2. The 15 mins between slacing up the policy should be extaly 15 min or could be about 15 min?

<br>

# Supositions

1. The system will notify by a model named "Person", a Person could have email, phone number (to sms) or both (at least one).
   On this way we will be able to check the history of who has closed the issue.

2. The sms service and email service will just send the sms/email.\
   On bigger systems we could create a `Communication Service` that could received less information like type of message, array of ways to send (sms, email, whatsapp, etc.), and a dynamic data to received the data associated to the message's type.
   But, if we are creating a monitoring service, we should avoid add any dependencies to prevent failing points and lose notifications from other critical systems.

<br>

# To be improved

1. Create a `Communication Service` that never* fails *(99.99999999% avality)\
   On this way the message that will be sent will be more cumtomizable.

