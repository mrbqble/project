import jsPDF from "jspdf";
import myImage from "./cert.png"
import myFont from "./FuturaPT-Medium.ttf";

export const certificate = (name, volunteeringHours, year, country, city, code) => {
    const doc = new jsPDF({
        orientation: "landscape"
    });

    doc.addImage(myImage, 'PNG', 0, 0, 297, 210);
    doc.addFileToVFS("MyFont.ttf", myFont);
    doc.addFont("MyFont.ttf", "MyFont", "bold");
    doc.setFont("MyFont");
      
    doc.setTextColor(1, 27, 99);
    doc.setFontSize(48);
    doc.text(name, 150, 85, {maxWidth: 150, align: "center"});
      
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    doc.text(`was volunteering for ${volunteeringHours} hours in ${year} in ${country}, ${city}`, 150, 100, {maxWidth: 160, align: "center"});
      
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(code, 10, 197);
      
    doc.save('a4.pdf');
}