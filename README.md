<h1 align="center">Incident Management Service</h1>

## Links
- [What is an incident?](#link1)
- [Objectives](#link2)
- [Examples Of incidents](#link3)
- [How to Create a Ticket](#link4)
- [How to Start server in production](#link5)
- [Development system](#link9)
- [The incident management process](#link6)
- [Refrence](#link7)
- [What is the next?](#link8)


## <a name="link1"></a>What is an incident?
We define an incident as an event that causes disruption to or a reduction in the quality of a service which requires an emergency response. Teams who follow ITIL or ITSM practices may use the term
major incident for this instead.

An incident is resolved when the affected service resumes functioning in its usual way. This includes only those tasks required to restore full functionality and excludes follow-on tasks such as root cause identification and mitigation, which are part of the postmortem.

The incident postmortem is done after the incident to determine the root cause and assign actions to ensure it is addressed before it can cause a repeat incident.


## <a name="link2"></a>Objectives
- Facilitate rapid restoration of services following an unplanned service interruption.
- Recognize, record, classify, and report Incident data at the appropriate times to the appropriate people.
- Create a single documented process for all Incidents.
- Maintain a single repository for recording all Incidents.
- Ensure the process is adopted, adhered to, and escalated if there are compliance issues.

## <a name="link3"></a>Examples Of incidents
- Service not available (this could be due to either the network or the application). 
- Error message when trying to access the application.
- Application bug or query preventing the user from working.
- Disk space full.
- Technical incident
- System down.
- Printer not printing
- New hardware, such as scanner, printer or digital camera, not working
- Technical incident

## <a name="link4"></a>How to Create a Ticket
1. Launch Service.
2. At Home Page fill all required fields.
3. Once you are done entering the required informatiom, save the ticket by clicking on the "Save" button.


## <a name="link5"></a>How to Start system in production
You can use one of this to start system
- [using docker you can start application](#linkdocker)
- go to server folder then run  `npm run  start:prod`

## <a name="link9"></a>Development system
1. flow install instruction in server folder.
2. flow install instruction in website folder.

## <a name="linkdocker"></a>start application using docker
1. run `docker compose up` then open website on http://127.0.0.1:3000


## <a name="link6"></a>The incident management process
1. Incident logging.
2. Incident categorization.
3. Incident prioritization.
4. Task creation and management.
5. Task resolve
6. Incident closure.

## <a name="link8"></a>What is the next?
1. account for end user.
2. attack files to form.
3. add voice, zoom meetings for end users.
4. replay message between admin and employee in company as message chat.
5. attach employee to groups and assign problem to anyone in group who has no work to do. 


## <a name="link7"></a>Refrence
- [ITIL_a guide to incident management](https://www.doc-developpement-durable.org/file/Projets-informatiques/cours-&-manuels-informatiques/ITIL/ITIL_a%20guide%20to%20incident%20management.pdf)
- [IM-Quick-Ref.pdf](https://www.bu.edu/tech/files/2011/04/IM-Quick-Ref.pdf)
- [Atlassianincidentmanagementhandbook](https://systemology.com.au/wp-content/uploads/2020/02/Atlassianincidentmanagementhandbook.pdf)


