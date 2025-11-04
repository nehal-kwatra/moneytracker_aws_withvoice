// Download dashboard as PDF
document.querySelector("#downloadReport").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "pt", "a4");

  const section = document.querySelector(".dashboard");
  const canvas = await html2canvas(section);
  const imgData = canvas.toDataURL("image/png");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("MoneyTracker_Report.pdf");
});
