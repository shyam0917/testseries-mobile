export class CommonConfig {
	public LOGO_PATH='/assets/images/testseries.png';
	public CARD_PATH='/assets/images/courseImg.jpg';
	public SIGNUP_PATH='/assets/images/test.png';

	// Roles variables being used
	public static USER_ADMIN = 'Admin';
	public static USER_TEACHER = 'Teacher';
	public static USER_STUDENT = 'Student';
	
	// Application platform to track request coming from
	public static APP_PLATFORM = {
		MOB: "Mobile",
		WEB: "Web"
	};

	public  Aws_URL = 'https://testseriescourses.s3.ap-south-1.amazonaws.com/';

	public static PaidOption=['Paid','Free']
	public static Vdocomnt =['Show Comment','No Comment']
	public static CommentOption=['Single Comment','Multiple Comment']
	public static iveStatus=['Offline','Online']
	public static displayStatus=['Enable','Disable']	
	// to set the content value 
	public static STATUS_CONTENT = ['Active','Inactive','Deleted','Drafted','Submitted','Rejected'];
	public static FLAGS=['0', '1', '2','3']; // 0 - email change , 1- mobile change 2- both change 3- email and mobile both not change
	// SET STATUS
	public static STATUS = {
		ACTIVE : 'Active',
		INACTIVE: 'Inactive'
	}
	
}