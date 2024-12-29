const { default: mongoose } = require("mongoose");



const studentsBooksPrivateSchema = new mongoose.Schema({
    file_id:String,
    email:String,
    classified:String,
    year:String,
    semester:String,
    branch: String,
    subject_name: String,
    unit_no: String,
    filename:String,
    content: Buffer,
    refer:Number,
    createdAt: {
        date: {
          type: String,
          default: () => {
            const currentDate = new Date();
            const addZero = (num) => (num < 10 ? `0${num}` : num);
            const day = addZero(currentDate.getDate());
            const month = addZero(currentDate.getMonth() + 1);
            const year = currentDate.getFullYear();
            const formattedDate = `${day}-${month}-${year} || ${day} ${getMonthName(month)} ${year}`;
            return `${formattedDate}`;
          }
        },
    
        time: {
          type: String,
          default: () => {
            const currentDate = new Date();
            const addZero = (num) => (num < 10 ? `0${num}` : num);
            const get12HourTime = (hours) => {
              const ampm = hours >= 12 ? 'PM' : 'AM';
              const formattedHours = hours % 12 || 12;
              return `${addZero(formattedHours)}:${addZero(currentDate.getMinutes())}:${addZero(currentDate.getSeconds())}.${currentDate.getMilliseconds()} ${ampm}`;
            };
            const formattedTime = get12HourTime(currentDate.getHours());
            return `${formattedTime}`;
          }
        }
      }
    })
    function getMonthName(month) {
      const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
      ];
    
      return months[parseInt(month) - 1];
    }


const StudentsBooksPrivateModel = mongoose.model("studentsbooksprivate", studentsBooksPrivateSchema);
module.exports = StudentsBooksPrivateModel;