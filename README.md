# Ship Tracker

Server Technology: NodeJS  

Frontend Technology: AngularJS v1.x, HTML5, Bootstrap4

Database: MongoDB

**Working: A user can enter the tracking number of the shipment and get details of
the Checkpoints on the map as well as on the sidebar.**

**REST API description:**

-  Add a Ship Journey
 
    -   One can add a ship Journey giving tracker/gps_id, checkpoints and other
relevant data according to the Schema shown below.
 
    -   Assumption: We are not adding the same journey twice.
 

-   Add a Shipment/Airway
 
    -   One can add a shipment related to a journey id.
 
    -   Cases Handled:
 
        -   If journey is not present.
 
        -   If journey is completed.
 
        -   If journey has crossed the pickup port of shipment
 
        -   Shipment start_port and end_port must be one of the checkpoints in
 the Journey.
 
        -   Other use cases also.
 

-   Update by GPS
 
    -   This will update the coordinates whenever GPS will call the PUT method.
 
    -   Cases handled:
 
        -   If the current position is End Port then it will mark the journey as
completed.
 
        -   If any checkpoint is reached then it will mark the checkpoint as
reached.
 
        -   Checkpoint can be marked as reached if it is near to the current
position (working on this currently).
	    -   Other use cases also.
Information about the tracking id

- Get

	-   Check whether a tracking id exists or not.
 
	-   If it exists then all the checkpoints and start port and end port are shown with marker on current position.  
	- Get Previous journey but this feature is not implemented in UI (working on it).

**Working now:**

-   Update the checkpoints if we are near to it.
 
-   Make a GET method for tracking the whole Ship.
 
-   Get previous journey of the ship.


**Future scope of work:**
 

-   Add Sockets to update the Map every time gps update is there.
 
-   Use customized maps.
 
-   Webpage for the Admin to post journeys and add shipments.
 
-   UI to be made more user friendly.
 
-   Code Refactor and proper documentation.
