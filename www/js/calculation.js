// JavaScript Document

var annualIncome;
var payFreq;
var payCheck;
var totalDays = 365;


var CALCULATED_VALUES = {
	hourly:	"",
	minute:	"",
	second:	"",
	daily:"",
	takeHome:"",
	tax:""
};

function calculate(annualIncome,payFreq,payCheck)
{
		var dailyPay;
		this.annualIncome = annualIncome;
		this.payFreq = payFreq;
		this.payCheck = payCheck;
		
		switch(payFreq) {
			case "Daily":
				dailyPay = payCheck;
				break;
			case "Weekly":
				dailyPay = payCheck / 7;
				break;
			case "Bi-Weekly":
				dailyPay = payCheck / 14;
				break;
			case "Semi-Monthly":
				dailyPay = ( payCheck * 24 ) / 365;
				break;
			case "Monthly":
				dailyPay = ( payCheck * 12 ) / 365;
				break;
				
			default:
				dailyPay = payCheck / 14;
		}
	
		
		this.CALCULATED_VALUES.daily = dailyPay;
		this.CALCULATED_VALUES.hourly = dailyPay / 24;
		this.CALCULATED_VALUES.minute = CALCULATED_VALUES.hourly / 60;
		this.CALCULATED_VALUES.second = CALCULATED_VALUES.minute / 60;
		this.CALCULATED_VALUES.takeHome = dailyPay*totalDays;
		this.CALCULATED_VALUES.tax = 1 - (this.CALCULATED_VALUES.takeHome / annualIncome);
		return CALCULATED_VALUES;
		
}