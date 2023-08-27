insert into admins (id,first_name,last_name,phone_number,email,password,cnp,role) values
(1,'Admin','Admin','000', 'admin','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','2900802018016','ADMIN');

insert into doctor (first_name,last_name,phone_number,email,password,cnp,role,clinic) values
('Mihai','Crisan','07949996', 'crisanmihai@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','1870815017668','DOCTOR','St.Peter'),
('George','Paun','07999697', 'paungeorge@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','1920211019267','DOCTOR','St.Lucia');

insert into patient (first_name,last_name,phone_number,email,password,cnp,role,gender,diagnostic,age,height_cm,weight_kg,doctor_id) values
('Miruna','Pop','07543125', 'mirunapop@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','2920211019453','PATIENT','FEMALE','HEALTHY',32,154.7,54.3,1),
('Marius','Lazar','07432497', 'mariuslazar@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','1950705016366','PATIENT','MALE','DIABETES_I',54,176.4,78.9,2),
('Denisa','Muresan','07949996', 'muresandeni@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','2871114017599','PATIENT','FEMALE','DIABETES_II',28,162.2,90.6,1),
('Gabriela','Jurca','07949426', 'gabijurca@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','2870114017543','PATIENT','FEMALE','GESTATIONAL',34,156.1,67.6,1),
('Gomoa','Felix','0743254397', 'gomoafelix@gmail.com','$2a$05$GIny7PaavzM8fcWL3ewJDeEFvTzd/L4lty7XxxclNeiFLfopL3rq2','1950805015362','PATIENT','MALE','DIABETES_I',54,146.4,78.9,1);

insert into glucose_level (time_stamp,glucose_mg_per_dl,patient_id) values
(1682265922089,154.7,1),
(1682262138000,175.3,1),
(1682263138000,180.4,1),
(1682264138000,140.5,1),
(1682261138000,99.7,2),
(1682262138000,120.3,2),
(1682263138000,110.4,2),
(1682264138000,105.5,2),
(1682261138000,120.7,3),
(1682262138000,160.3,3),
(1682263138000,130.4,3),
(1682264138000,120.5,3);