insert into admins (id,first_name,last_name,phone_number,email,password,cnp,role) values
(1,'Admin','Admin','000', 'admin','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','2900802018016','ADMIN');

insert into doctor (first_name,last_name,phone_number,email,password,cnp,role,clinic) values
('Mihai','Crisan','07949996', 'crisanmihai@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','1870815017668','DOCTOR','St.Peter'),
('George','Paun','07999697', 'paungeorge@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','1920211019267','DOCTOR','St.Lucia');

insert into patient (first_name,last_name,phone_number,email,password,cnp,role,gender,diagnostic,age,height_cm,weight_kg,doctor_id) values
('Miruna','Pop','07543125', 'mirunapop@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','2920211019453','PATIENT','FEMALE','HEALTHY',32,154.7,54.3,1),
('Marius','Lazar','07432497', 'mariuslazar@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','1950705016366','PATIENT','MALE','DIABETES_II',54,176.4,78.9,1),
('Denisa','Muresan','07949996', 'muresandeni@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','2871114017599','PATIENT','FEMALE','DIABETES_I',28,162.2,90.6,1),
('Gabriela','Jurca','07949426', 'gabijurca@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','2870114017543','PATIENT','FEMALE','DIABETES_II',34,156.1,67.6,1),
('Gomoa','Felix','0743254397', 'gomoafelix@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','1950805015362','PATIENT','MALE','DIABETES_I',54,146.4,78.9,2);

insert into glucose_level (timestamp,glucose_mg_per_dl,patient_id) values
(1693877430,86,1),
(1693877730,81,1),
(1693878030,78,1),
(1693878330,76,1),
(1693878630,76,1),
(1693878930,77,1),
(1693879230,78,1),
(1693879530,80,1),
(1693879830,81,1),
(1693880130,82,1),
(1693880430,82,1),
(1693880730,82,1),
(1693881030,81,1),
(1693881330,81,1),
(1693881630,80,1),
(1693881930,80,1),
(1693882230,81,1),
(1693882530,82,1),
(1693882830,83,1),
(1693883130,85,1),
(1693883430,87,1),
(1693883730,88,1),
(1693884030,89,1),
(1693884330,89,1),
(1693884630,88,1),
(1693884930,87,1),
(1693885230,86,1),
(1693885530,85,1),
(1693885830,84,1),
(1693886130,84,1),
(1693886430,83,1),
(1693886730,83,1),
(1693887030,82,1),
(1693887330,82,1),
(1693887630,82,1),
(1693887930,81,1),
(1693888230,80,1),
(1693888530,79,1),
(1693888830,79,1),
(1693889130,80,1),
(1693889430,81,1),
(1693889730,82,1),
(1693890030,83,1),
(1693890330,83,1),
(1693890630,83,1),
(1693890930,83,1),
(1693891230,83,1),
(1693891530,82,1),
(1693891830,82,1),
(1693892130,82,1),
(1693892430,82,1),
(1693892730,81,1),
(1693893030,81,1),
(1693893330,79,1),
(1693893630,78,1),
(1693893930,76,1),
(1693894230,74,1),
(1693894530,73,1),
(1693894830,72,1),
(1693895130,72,1),
(1693895430,72,1),
(1693895730,73,1),
(1693896030,73,1),
(1693896330,74,1),
(1693896630,74,1),
(1693896930,75,1),
(1693897230,75,1),
(1693897530,74,1),
(1693897830,74,1),
(1693898130,73,1),
(1693898430,73,1),
(1693898730,72,1),
(1693899030,72,1),
(1693899330,73,1),
(1693899630,73,1),
(1693899930,73,1),
(1693900230,73,1),
(1693900530,73,1),
(1693900830,73,1),
(1693901130,74,1),
(1693901430,74,1),
(1693901730,74,1),
(1693902030,74,1),
(1693902330,74,1),
(1693902630,74,1),
(1693902930,75,1),
(1693903230,76,1),
(1693903530,76,1),
(1693903830,75,1),
(1693904130,75,1),
(1693904430,75,1),
(1693904730,75,1),
(1693905030,77,1),
(1693905330,79,1),
(1693905630,82,1),
(1693905930,84,1),
(1693906230,84,1),
(1693906530,85,1),
(1693906830,85,1),
(1693907130,86,1),
(1693907430,89,1),
(1693907730,93,1),
(1693908030,99,1),
(1693908330,107,1),
(1693908630,114,1),
(1693908930,120,1),
(1693909230,123,1),
(1693909530,123,1),
(1693909830,120,1),
(1693910130,114,1),
(1693910430,109,1),
(1693910730,103,1),
(1693911030,99,1),
(1693911330,96,1),
(1693911630,94,1),
(1693911930,92,1),
(1693912230,90,1),
(1693912530,90,1),
(1693912830,89,1),
(1693913130,90,1),
(1693913430,91,1),
(1693913730,91,1),
(1693914030,91,1),
(1693914330,90,1),
(1693914630,89,1),
(1693914930,88,1),
(1693915230,86,1),
(1693915530,84,1),
(1693915830,83,1),
(1693916130,81,1),
(1693916430,81,1),
(1693916730,80,1),
(1693917030,79,1),
(1693917330,79,1),
(1693917630,79,1),
(1693917930,79,1),
(1693918230,79,1),
(1693918530,80,1),
(1693918830,80,1),
(1693919130,80,1),
(1693919430,80,1),
(1693919730,79,1),
(1693920030,79,1),
(1693920330,79,1),
(1693920630,79,1),
(1693920930,79,1),
(1693921230,79,1),
(1693921530,80,1),
(1693921830,81,1),
(1693922130,81,1),
(1693922430,82,1),
(1693922730,83,1),
(1693923030,84,1),
(1693923330,85,1),
(1693923630,86,1),
(1693923930,87,1),
(1693924230,87,1),
(1693924530,87,1),
(1693924830,87,1),
(1693925130,87,1),
(1693925430,86,1),
(1693925730,86,1),
(1693926030,85,1),
(1693926330,84,1),
(1693926630,83,1),
(1693926930,82,1),
(1693927230,82,1),
(1693927530,83,1),
(1693927830,83,1),
(1693928130,84,1),
(1693928430,85,1),
(1693928730,85,1),
(1693929030,86,1),
(1693929330,88,1),
(1693929630,90,1),
(1693929930,94,1),
(1693930230,99,1),
(1693930530,104,1),
(1693930830,109,1),
(1693931130,114,1),
(1693931430,118,1),
(1693931730,123,1),
(1693932030,126,1),
(1693932330,129,1),
(1693932630,131,1),
(1693932930,132,1),
(1693933230,132,1),
(1693933530,131,1),
(1693933830,131,1),
(1693934130,131,1),
(1693934430,133,1),
(1693934730,136,1),
(1693935030,140,1),
(1693935330,143,1),
(1693935630,145,1),
(1693935930,146,1),
(1693936230,145,1),
(1693936530,144,1),
(1693936830,142,1),
(1693937130,140,1),
(1693937430,137,1),
(1693937730,135,1),
(1693938030,131,1),
(1693938330,127,1),
(1693938630,121,1),
(1693938930,115,1),
(1693939230,110,1),
(1693939530,106,1),
(1693939830,103,1),
(1693940130,101,1),
(1693940430,99,1),
(1693940730,98,1),
(1693941030,97,1),
(1693941330,96,1),
(1693941630,95,1),
(1693941930,95,1),
(1693942230,94,1),
(1693942530,93,1),
(1693942830,91,1),
(1693943130,89,1),
(1693943430,87,1),
(1693943730,84,1),
(1693944030,82,1),
(1693944330,81,1),
(1693944630,80,1),
(1693944930,79,1),
(1693945230,79,1),
(1693945530,78,1),
(1693945830,77,1),
(1693946130,76,1),
(1693946430,76,1),
(1693946730,76,1),
(1693947030,76,1),
(1693947330,78,1),
(1693947630,80,1),
(1693947930,82,1),
(1693948230,83,1),
(1693948530,84,1),
(1693948830,84,1),
(1693949130,83,1),
(1693949430,83,1),
(1693949730,82,1),
(1693950030,82,1),
(1693950330,82,1),
(1693950630,83,1),
(1693950930,84,1),
(1693951230,85,1),
(1693951530,87,1),
(1693951830,88,1),
(1693952130,89,1),
(1693952430,89,1),
(1693952730,90,1),
(1693953030,91,1),
(1693953330,94,1),
(1693953630,98,1),
(1693953930,104,1),
(1693954230,111,1),
(1693954530,118,1),
(1693954830,123,1),
(1693955130,127,1),
(1693955430,129,1),
(1693955730,128,1),
(1693956030,127,1),
(1693956330,125,1),
(1693956630,124,1),
(1693956930,123,1),
(1693957230,124,1),
(1693957530,127,1),
(1693957830,131,1),
(1693958130,136,1),
(1693958430,143,1),
(1693958730,148,1),
(1693959030,153,1),
(1693959330,155,1),
(1693959630,155,1),
(1693959930,154,1),
(1693960230,152,1),
(1693960530,150,1),
(1693960830,148,1),
(1693961130,147,1),
(1693961430,145,1),
(1693961730,142,1),
(1693962030,139,1),
(1693962330,134,1),
(1693962630,129,1),
(1693962930,123,1),
(1693963230,117,1),
(1693963530,111,1),
(1693963830,107,1),
(1693964130,105,1),
(1693964430,104,1),
(1693964730,103,1),
(1693965030,103,1),
(1693965330,103,1),
(1693965630,104,1),
(1693965930,105,1),
(1693966230,106,1),
(1693966530,107,1),
(1693966830,107,1),
(1693967130,107,1),
(1693967430,106,1),
(1693967730,105,1),
(1693968030,104,1),
(1693968330,104,1),
(1693968630,103,1),
(1693968930,103,1),
(1693969230,102,1),
(1693969530,102,1),
(1693969830,102,1),
(1693970130,102,1),
(1693970430,101,1),
(1693970730,101,1),
(1693971030,100,1),
(1693971330,100,1),
(1693971630,100,1),
(1693971930,101,1),
(1693972230,102,1),
(1693972530,103,1),
(1693972830,104,1),
(1693973130,104,1),
(1693973430,104,1),
(1693973730,105,1),
(1693974030,105,1),
(1693974330,104,1),
(1693974630,104,1),
(1693974930,103,1),
(1693975230,103,1),
(1693975530,102,1),
(1693975830,100,1),
(1693976130,99,1),
(1693976430,98,1),
(1693976730,96,1),
(1693977030,96,1),
(1693977330,95,1),
(1693977630,95,1),
(1693977930,95,1),
(1693978230,95,1),
(1693978530,95,1),
(1693978830,96,1),
(1693979130,96,1),
(1693979430,97,1),
(1693979730,97,1),
(1693980030,97,1),
(1693980330,97,1),
(1693980630,96,1),
(1693980930,95,1),
(1693981230,94,1),
(1693981530,93,1),
(1693981830,92,1),
(1693982130,91,1),
(1693982430,91,1),
(1693982730,91,1),
(1693983030,92,1),
(1693983330,93,1),
(1693983630,94,1),
(1693983930,95,1),
(1693984230,95,1),
(1693984530,96,1),
(1693984830,96,1),
(1693985130,95,1),
(1693985430,94,1),
(1693985730,93,1),
(1693986030,92,1),
(1693986330,92,1),
(1693986630,91,1),
(1693986930,91,1),
(1693987230,91,1),
(1693987530,91,1),
(1693987830,92,1),
(1693988130,92,1),
(1693988430,94,1),
(1693988730,95,1),
(1693989030,96,1),
(1693989330,96,1),
(1693989630,96,1),
(1693989930,95,1),
(1693990230,94,1),
(1693990530,94,1),
(1693990830,94,1),
(1693991130,94,1),
(1693991430,94,1),
(1693991730,95,1),
(1693992030,95,1),
(1693992330,95,1),
(1693992630,95,1),
(1693992930,94,1),
(1693993230,94,1),
(1693993530,94,1),
(1693993830,94,1),
(1693994130,95,1),
(1693994430,95,1),
(1693994730,95,1),
(1693995030,95,1),
(1693995330,95,1),
(1693995630,94,1),
(1693995930,94,1),
(1693996230,95,1),
(1693996530,95,1),
(1693996830,96,1),
(1693997130,96,1),
(1693997430,97,1),
(1693997730,97,1),
(1693998030,96,1),
(1693998330,95,1),
(1693998630,93,1),
(1693998930,93,1),
(1693999230,95,1),
(1693999530,99,1),
(1693999830,106,1),
(1694000130,115,1),
(1694000430,125,1),
(1694000730,133,1),
(1694001030,138,1),
(1694001330,138,1),
(1694001630,134,1),
(1694001930,128,1),
(1694002230,120,1),
(1694002530,113,1),
(1694002830,107,1),
(1694003130,103,1),
(1694003430,100,1),
(1694003730,99,1),
(1694004030,99,1),
(1694004330,100,1),
(1694004630,102,1),
(1694004930,104,1),
(1694005230,105,1),
(1694005530,107,1),
(1694005830,107,1),
(1694006130,106,1),
(1694006430,105,1),
(1694006730,104,1),
(1694007030,102,1),
(1694007330,99,1),
(1694007630,97,1),
(1694007930,94,1),
(1694008230,91,1),
(1694008530,89,1),
(1694008830,87,1),
(1694009130,86,1),
(1694009430,85,1),
(1694009730,84,1),
(1694010030,84,1),
(1694010330,83,1),
(1694010630,83,1),
(1694010930,83,1),
(1694011230,83,1),
(1694011530,83,1),
(1694011830,83,1),
(1694012130,83,1),
(1694012430,83,1),
(1694012730,83,1),
(1694013030,83,1),
(1694013330,83,1),
(1694013630,83,1),
(1694013930,82,1),
(1694014230,82,1),
(1694014530,81,1),
(1694014830,81,1),
(1694015130,80,1),
(1694015430,81,1),
(1694015730,83,1),
(1694016030,86,1),
(1694016330,91,1),
(1694016630,96,1),
(1694016930,102,1),
(1694017230,106,1),
(1694017530,109,1),
(1694017830,112,1),
(1694018130,114,1),
(1694018430,116,1),
(1694018730,118,1),
(1694019030,120,1),
(1694019330,121,1),
(1694019630,122,1),
(1694019930,123,1),
(1694020230,123,1),
(1694020530,123,1),
(1694020830,123,1),
(1694021130,123,1),
(1694021430,122,1),
(1694021730,121,1),
(1694022030,119,1),
(1694022330,117,1),
(1694022630,116,1),
(1694022930,115,1),
(1694023230,116,1),
(1694023530,118,1),
(1694023830,122,1),
(1694024130,126,1),
(1694024430,129,1),
(1694024730,131,1),
(1694025030,132,1),
(1694025330,132,1),
(1694025630,130,1),
(1694025930,129,1),
(1694026230,127,1),
(1694026530,126,1),
(1694026830,125,1),
(1694027130,125,1),
(1694027430,125,1),
(1694027730,125,1),
(1694028030,124,1),
(1694028330,120,1),
(1694028630,114,1),
(1694028930,105,1),
(1694029230,95,1),
(1694029530,84,1),
(1694029830,76,1),
(1694030130,71,1),
(1694030430,69,1),
(1694030730,70,1),
(1694031030,73,1),
(1694031330,76,1),
(1694031630,80,1),
(1694031930,83,1),
(1694032230,86,1),
(1694032530,88,1),
(1694032830,90,1),
(1694033130,91,1),
(1694033430,91,1),
(1694033730,91,1),
(1694034030,91,1),
(1694034330,91,1),
(1694034630,90,1),
(1694034930,88,1),
(1694035230,86,1),
(1694035530,84,1),
(1694035830,81,1),
(1694036130,78,1),
(1694036430,77,1),
(1694036730,79,1),
(1694037030,80,1),
(1694037330,81,1),
(1694037630,82,1),
(1694037930,84,1),
(1694038230,85,1),
(1694038530,87,1),
(1694038830,89,1),
(1694039130,91,1),
(1694039430,93,1),
(1694039730,95,1),
(1694040030,98,1),
(1694040330,102,1),
(1694040630,107,1),
(1694040930,111,1),
(1694041230,116,1),
(1694041530,121,1),
(1694041830,125,1),
(1694042130,129,1),
(1694042430,131,1),
(1694042730,133,1),
(1694043030,134,1),
(1694043330,135,1),
(1694043630,136,1),
(1694043930,136,1),
(1694044230,136,1),
(1694044530,135,1),
(1694044830,133,1),
(1694045130,130,1),
(1694045430,129,1),
(1694045730,128,1),
(1694046030,128,1),
(1694046330,128,1),
(1694046630,128,1),
(1694046930,128,1),
(1694047230,128,1),
(1694047530,127,1),
(1694047830,126,1),
(1694048130,126,1),
(1694048430,126,1),
(1694048730,126,1),
(1694049030,124,1),
(1694049330,121,1),
(1694049630,116,1),
(1694049930,110,1),
(1682261138,99.7,2),
(1682262138,120.3,2),
(1682263138,110.4,2),
(1682264138,105.5,2),
(1682261138,120.7,3),
(1682262138,160.3,3),
(1682263138,130.4,3),
(1682264138,120.5,3);