The problem is: Multiples services could accesss to the database at the same time.
This services will load same object but, when saved, will be saved only the changes from the last one.

The common way to fix this is using a ORM that make a transaction in the database.
Due there is no a database defined, I have implemented a ver abstract comunication to persistance.

The implementations thinks in 2 possibles access to the database

The main _thread_ will run this:
- Services Fails
- Notify to domiain logic
- Create Alert
- Scale Up Alert
- Send alerts to EP
- Set Timer
- Repeat from Scale Up alert.

The close _thread_ could only do:
- Closed alert

<br>

To fix this _simple_ scenario I need a transaction function on the persistanceAdapter called: `modifyAlertIfNotClosed` that will update the Alert only if the closed time is not defined, them, is not closed. Also should ensure that there is no another edit after them that could lose data.

I have use this approach to get a realtime system.

## Check the system
Once the Alert is created, the alert could be closed at any time.
The main thread will edit the Alert data continuosly, and the close thread will only do only one this.
The implentation makes that the main thread should ensure that the 
alert is not closed.


## Other implementations could manage:
- Serverless function limit to max 1 instace to handle all changes in relation with 1 Alert. Also could use SQS (qeue) or SNS (Notifications) to improve it.
- Classic T-SQL database with ORM that allow transactions like [Sequelize](https://sequelize.org/master/manual/transactions.html) (Extra: maybe this could use DynamoDB with [this npm](https://www.npmjs.com/package/dynamo-sequelize) but not telling nothing about transactions)
- Make a copy of the reference object retrived from the persistance system, compare original with the edited and notify only changes made to the element (ORMs will help).


