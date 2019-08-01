export class ValidationConfig {
  public static  EMAIL_PATTERN = /[a-zA-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ;
  public static  NAME_PATTERN = /^[a-z A-Z]+$/ ;
  public static  MOB_NO_PATTERN= /(7|8|9)\d{9}$/ ;
  public static  NUMBER_PATTERN= /^[0-9]+$/ ;
  public static  LETTERS_PATTERN = /^[a-zA-Z ]+$/ ;
  public static  PASSWORD_PATTERN = /^.*\\S.*[a-zA-z0-9!#$%&'*@()?^]$/
  public static  PHONE_PATTERN=/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
}