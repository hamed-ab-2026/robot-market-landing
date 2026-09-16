import type {CustomerOrder} from '@/types/account';

export async function downloadInvoicePdf(element: HTMLElement, filename: string) {
    const [{default: html2canvas}, {jsPDF}] = await Promise.all([import('html2canvas'), import('jspdf')]);
    const canvas = await html2canvas(element, {scale: 2, backgroundColor: '#ffffff', useCORS: true});
    const image = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({orientation: 'portrait', unit: 'mm', format: 'a4'});
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imageHeight = (canvas.height * pageWidth) / canvas.width;
    let remaining = imageHeight;
    let position = 0;
    pdf.addImage(image, 'JPEG', 0, position, pageWidth, imageHeight);
    remaining -= pageHeight;
    while (remaining > 0) {
        position = remaining - imageHeight;
        pdf.addPage();
        pdf.addImage(image, 'JPEG', 0, position, pageWidth, imageHeight);
        remaining -= pageHeight;
    }
    pdf.save(`${filename}.pdf`);
}

export async function downloadInvoiceExcel(order: CustomerOrder, filename: string) {
    const ExcelJS = await import('exceljs');
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('پیش فاکتور', {views: [{rightToLeft: true}]});
    sheet.columns = [
        {header: 'نام دستگاه', key: 'name', width: 34},
        {header: 'مدل', key: 'model', width: 14},
        {header: 'امکانات', key: 'modules', width: 44},
        {header: 'تعداد', key: 'quantity', width: 10},
        {header: 'قیمت واحد (ریال)', key: 'unitPrice', width: 22},
        {header: 'جمع (ریال)', key: 'total', width: 22},
    ];
    order.items.forEach(item => sheet.addRow({
        name: item.name, model: item.model, modules: item.modules.join('، '), quantity: item.quantity,
        unitPrice: item.unitPrice, total: item.unitPrice * item.quantity,
    }));
    const subtotal = order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const total = subtotal - (order.invoice?.discount || 0) + (order.invoice?.shipping || 0) + (order.invoice?.tax || 0);
    sheet.addRow({name: 'مبلغ نهایی', total});
    sheet.getRow(1).font = {bold: true, color: {argb: 'FFFFFFFF'}};
    sheet.getRow(1).fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF00A693'}};
    sheet.getRow(sheet.rowCount).font = {bold: true, color: {argb: 'FF006D61'}};
    sheet.getColumn('unitPrice').numFmt = '#,##0';
    sheet.getColumn('total').numFmt = '#,##0';
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
}
