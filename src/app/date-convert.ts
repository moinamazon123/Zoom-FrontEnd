export class DateConvert {
    convert(inputData) {
        // 2019-08-13 06:14:01	
        // 14/05/2019 01:55:20
        var dateValue=inputData.split(" ");
        var tempDate;
        var tempHour;
        var dateFormat=[];
        if(dateValue[0].split("/").length>1){
            tempDate=dateValue[0].split("/");
            tempHour=dateValue[1].split(":");
            return new Date(tempDate[2],parseInt(tempDate[1])-1,tempDate[0],tempHour[0],tempHour[1],tempHour[2],0);
        }else if(dateValue[0].split("-").length>1){
            tempDate=dateValue[0].split("-");
            tempHour=dateValue[1].split(":");
            return new Date(parseInt(tempDate[0]),parseInt(tempDate[1])-1,parseInt(tempDate[2]),parseInt(tempHour[0]),parseInt(tempHour[1]),parseInt(tempHour[2]),0);
            // return new Date(parseInt(tempDate[0]),parseInt(tempDate[1]),parseInt(tempDate[2]),parseInt(tempHour[0]),parseInt(tempHour[1]),parseInt(tempHour[2]),0);
            
            // return new Date();
        }
 

    }
}
