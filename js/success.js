// ======================================================
// EARTHCRAFT ULTIMATE PRO INVOICE ENGINE
// Version : Ultimate Pro v1.0
// ======================================================

const { jsPDF } = window.jspdf;

document.getElementById("downloadInvoice").addEventListener("click", generateInvoice);

// ======================================================
// MAIN FUNCTION
// ======================================================

function generateInvoice(){

    //----------------------------------------------------
    // ORDER DATA
    //----------------------------------------------------

    const order = JSON.parse(
        localStorage.getItem("earthcraft-order")
    );

    if(!order){

        alert("Order not found.");

        return;

    }

    //----------------------------------------------------
    // PDF
    //----------------------------------------------------

    const doc = new jsPDF({

        orientation:"portrait",

        unit:"mm",

        format:"a4",

        compress:true

    });

    //----------------------------------------------------
    // PAGE SIZE
    //----------------------------------------------------

    const PAGE = {

        width:doc.internal.pageSize.getWidth(),

        height:doc.internal.pageSize.getHeight(),

        margin:10

    };

    //----------------------------------------------------
    // COLORS
    //----------------------------------------------------

    const COLORS={

        primary:[88,57,39],

        secondary:[164,116,73],

        border:[220,220,220],

        light:[248,247,243],

        dark:[35,35,35],

        white:[255,255,255],

        success:[16,185,129],

        warning:[245,158,11],

        danger:[220,38,38]

    };

    //----------------------------------------------------
    // COMPANY
    //----------------------------------------------------

    const COMPANY={

        name:"EARTHCRAFT POTTERY STUDIO",

        tagline:"Premium Handmade Clay & Ceramic Collection",

        address:"New Delhi, India - 110059",

        phone:"+91 95607 27540",

        email:"support@earthcraft.com",

        website:"www.earthcraft.com",

        gst:"07ABCDE1234F1Z5",

        pan:"ABCDE1234F",

        bank:"HDFC BANK",

        account:"XXXXXXXX1234",

        ifsc:"HDFC0001234",

        upi:"earthcraft@hdfcbank"

    };

    //----------------------------------------------------
    // LAYOUT
    //----------------------------------------------------

    let currentY=10;

    const HEADER_HEIGHT=34;

    const FOOTER_HEIGHT=18;

    //----------------------------------------------------
    // HELPER
    //----------------------------------------------------

    function pageBreak(requiredHeight){

        if(currentY+requiredHeight>

        PAGE.height-FOOTER_HEIGHT){

            doc.addPage();

            drawHeader();

            currentY=HEADER_HEIGHT+10;

        }

    }

    //----------------------------------------------------
    // HEADER
    //----------------------------------------------------

    function drawHeader(){

        doc.setFillColor(...COLORS.primary);

        doc.rect(

            0,

            0,

            PAGE.width,

            HEADER_HEIGHT,

            "F"

        );

        doc.setFillColor(255,255,255);

        doc.circle(

            18,

            17,

            8,

            "F"

        );

        doc.setTextColor(...COLORS.primary);

        doc.setFontSize(16);

        doc.setFont("helvetica","bold");

        doc.text(

            "EC",

            18,

            19,

            {

                align:"center"

            }

        );

        doc.setTextColor(255,255,255);

        doc.setFontSize(18);

        doc.text(

            COMPANY.name,

            32,

            14

        );

        doc.setFontSize(9);

        doc.setFont("helvetica","normal");

        doc.text(

            COMPANY.tagline,

            32,

            21

        );

        doc.text(

            COMPANY.website,

            32,

            27

        );

        doc.setFont("helvetica","bold");

        doc.setFontSize(20);

        doc.text(

            "TAX INVOICE",

            PAGE.width-10,

            16,

            {

                align:"right"

            }

        );

    }

    //----------------------------------------------------
    // FOOTER
    //----------------------------------------------------

    function drawFooter(page,total){

        doc.setPage(page);

        doc.setDrawColor(...COLORS.primary);

        doc.line(

            10,

            PAGE.height-10,

            PAGE.width-10,

            PAGE.height-10

        );

        doc.setFontSize(8);

        doc.setTextColor(120);

        doc.text(

            COMPANY.website,

            10,

            PAGE.height-5

        );

        doc.text(

            COMPANY.email,

            PAGE.width/2,

            PAGE.height-5,

            {

                align:"center"

            }

        );

        doc.text(

            "Page "+page+" of "+total,

            PAGE.width-10,

            PAGE.height-5,

            {

                align:"right"

            }

        );

    }

    //----------------------------------------------------
    // START
    //----------------------------------------------------

    drawHeader();

    currentY=45;

        //----------------------------------------------------
    // INVOICE INFORMATION
    //----------------------------------------------------

    const invoice = {

        number:
            "INV-" +
            new Date().getFullYear() +
            "-" +
            String(Date.now()).slice(-6),

        orderId:
            order.orderId || "-",

        date:
            new Date().toLocaleDateString("en-IN"),

        paymentMethod:
            "Cash On Delivery",

        paymentStatus:
            "PENDING"

    };

    //----------------------------------------------------
    // COMPANY CARD
    //----------------------------------------------------

    function drawCompanyCard(){
doc.setTextColor(0, 0, 0);

doc.setFont("helvetica","bold");

doc.setFontSize(12);

        pageBreak(60);

        doc.setFillColor(...COLORS.white);

        doc.roundedRect(
            10,
            currentY,
            92,
            58,
            3,
            3,
            "F"
        );

        doc.setDrawColor(...COLORS.border);

        doc.roundedRect(
            10,
            currentY,
            92,
            58,
            3,
            3
        );

        doc.setFont("helvetica","bold");
        doc.setFontSize(12);

        doc.text(
            "Company Details",
            15,
            currentY+10
        );

        doc.setFont("helvetica","normal");
        doc.setFontSize(9);

        doc.text(COMPANY.name,15,currentY+18);
        doc.text(COMPANY.address,15,currentY+25);
        doc.text("GSTIN : "+COMPANY.gst,15,currentY+32);
        doc.text("PAN : "+COMPANY.pan,15,currentY+39);
        doc.text("Phone : "+COMPANY.phone,15,currentY+46);
        doc.text("Email : "+COMPANY.email,15,currentY+53);

    }

    //----------------------------------------------------
    // INVOICE CARD
    //----------------------------------------------------

    function drawInvoiceCard(){
doc.setTextColor(0, 0, 0);

doc.setFont("helvetica","bold");

doc.setFontSize(12);

        doc.setFillColor(...COLORS.white);

        doc.roundedRect(
            108,
            currentY,
            92,
            58,
            3,
            3,
            "F"
        );

        doc.setDrawColor(...COLORS.border);

        doc.roundedRect(
            108,
            currentY,
            92,
            58,
            3,
            3
        );

        doc.setFont("helvetica","bold");
        doc.setFontSize(12);

        doc.text(
            "Invoice Details",
            113,
            currentY+10
        );

        doc.setFont("helvetica","normal");
        doc.setFontSize(9);

        doc.text("Invoice No",113,currentY+18);
        doc.text(invoice.number,152,currentY+18);

        doc.text("Order ID",113,currentY+26);
        doc.text(invoice.orderId,152,currentY+26);

        doc.text("Date",113,currentY+34);
        doc.text(invoice.date,152,currentY+34);

        doc.text("Payment",113,currentY+42);
        doc.text(invoice.paymentMethod,152,currentY+42);

        doc.text("Status",113,currentY+50);

        doc.setFillColor(...COLORS.warning);

        doc.roundedRect(
            150,
            currentY+45,
            38,
            8,
            2,
            2,
            "F"
        );

        doc.setTextColor(255,255,255);

        doc.setFont("helvetica","bold");

        doc.text(
            invoice.paymentStatus,
            169,
            currentY+50,
            {
                align:"center"
            }
        );

        doc.setTextColor(...COLORS.dark);

    }

    //----------------------------------------------------
    // CUSTOMER CARD
    //----------------------------------------------------

    function drawCustomerCard(){

        currentY += 68;

        pageBreak(60);

        doc.setFillColor(...COLORS.white);

        doc.roundedRect(
            10,
            currentY,
            190,
            58,
            3,
            3,
            "F"
        );

        doc.setDrawColor(...COLORS.border);

        doc.roundedRect(
            10,
            currentY,
            190,
            58,
            3,
            3
        );

        doc.setFont("helvetica","bold");
        doc.setFontSize(12);

        doc.text(
            "Bill To",
            15,
            currentY+10
        );

        doc.setFont("helvetica","normal");
        doc.setFontSize(9);

        doc.text(
            "Customer : " + (order.customer || "-"),
            15,
            currentY+20
        );

        doc.text(
            "Email : " + (order.email || "-"),
            15,
            currentY+28
        );

        doc.text(
            "Mobile : " + (order.mobile || "-"),
            15,
            currentY+36
        );

        const address = doc.splitTextToSize(
            order.address || "-",
            135
        );

        doc.text(
            "Address :",
            15,
            currentY+44
        );

        doc.text(
            address,
            38,
            currentY+44
        );

        currentY += 72;

    }

    //----------------------------------------------------
    // DRAW TOP SECTION
    //----------------------------------------------------

    drawCompanyCard();

    drawInvoiceCard();

    drawCustomerCard();

        //----------------------------------------------------
    // PRODUCT TABLE ENGINE
    //----------------------------------------------------

    function drawProductTable(){

        pageBreak(40);

        let tableRows = [];

        let taxableAmount = 0;

        (order.items || []).forEach((item,index)=>{

            const qty =
                Number(item.quantity) || 1;

            const rate =
                Number(item.price) || 0;

            const amount =
                qty * rate;

            const gstRate = 18;

            const discount = 0;

            const total =
                amount +
                (amount * gstRate / 100) -
                discount;

            taxableAmount += amount;

            tableRows.push([

                index + 1,

                item.name || "-",

                "EC-" +
                String(index+1).padStart(3,"0"),

                qty,

                "₹ " + rate.toFixed(2),

                gstRate + "%",

                "₹ " + discount.toFixed(2),

                "₹ " + total.toFixed(2)

            ]);

        });

        doc.autoTable({

            startY:currentY,

            theme:"grid",

            margin:{
                left:10,
                right:10
            },

            head:[[
                "S.No",
                "Product",
                "SKU",
                "Qty",
                "Rate",
                "GST",
                "Discount",
                "Total"
            ]],

            body:tableRows,

            styles:{

                font:"helvetica",

                fontSize:9,

                cellPadding:3,

                lineWidth:0.2,

                lineColor:COLORS.border,

                textColor:COLORS.dark

            },

            headStyles:{

                fillColor:COLORS.primary,

                textColor:[255,255,255],

                fontStyle:"bold",

                halign:"center"

            },

            alternateRowStyles:{

                fillColor:[250,250,250]

            },

            columnStyles:{

                0:{
                    cellWidth:12,
                    halign:"center"
                },

                1:{
                    cellWidth:56
                },

                2:{
                    cellWidth:22,
                    halign:"center"
                },

                3:{
                    cellWidth:14,
                    halign:"center"
                },

                4:{
                    cellWidth:24,
                    halign:"right"
                },

                5:{
                    cellWidth:16,
                    halign:"center"
                },

                6:{
                    cellWidth:22,
                    halign:"right"
                },

                7:{
                    cellWidth:24,
                    halign:"right"
                }

            },

           didDrawPage: function (data) {

    if (data.pageNumber > 1) {
        drawHeader();
    }

}

        });

        currentY =
            doc.lastAutoTable.finalY + 10;

        //------------------------------------------------
        // CALCULATIONS
        //------------------------------------------------

        const deliveryCharge = 50;

        const discountAmount = 0;

        const cgst =
            taxableAmount * 0.09;

        const sgst =
            taxableAmount * 0.09;

        const totalGST =
            cgst + sgst;

        const grandTotal =
            taxableAmount +
            totalGST +
            deliveryCharge -
            discountAmount;

        return{

            taxableAmount,

            deliveryCharge,

            discountAmount,

            cgst,

            sgst,

            totalGST,

            grandTotal

        };

    }

    //----------------------------------------------------
    // DRAW PRODUCT TABLE
    //----------------------------------------------------

    const totals =
        drawProductTable();

            //----------------------------------------------------
    // SUMMARY SECTION
    //----------------------------------------------------

    function drawSummary(totals){

        pageBreak(95);

        const boxX = 118;
        const boxY = currentY;
        const boxWidth = 82;
        const boxHeight = 62;

        doc.setFillColor(...COLORS.white);

        doc.roundedRect(
            boxX,
            boxY,
            boxWidth,
            boxHeight,
            3,
            3,
            "F"
        );

        doc.setDrawColor(...COLORS.border);

        doc.roundedRect(
            boxX,
            boxY,
            boxWidth,
            boxHeight,
            3,
            3
        );

        doc.setFont("helvetica","bold");
        doc.setFontSize(12);

        doc.text(
            "Invoice Summary",
            boxX+5,
            boxY+9
        );

        doc.setFont("helvetica","normal");
        doc.setFontSize(9);

        let y = boxY + 18;

        function row(label,value){

            doc.text(label,boxX+5,y);

            doc.text(
                "₹ " + value.toFixed(2),
                boxX+77,
                y,
                {
                    align:"right"
                }
            );

            y += 8;

        }

        row("Taxable Amount",totals.taxableAmount);
        row("CGST (9%)",totals.cgst);
        row("SGST (9%)",totals.sgst);
        row("Delivery",totals.deliveryCharge);
        row("Discount",totals.discountAmount);

        doc.line(
            boxX+4,
            y-3,
            boxX+78,
            y-3
        );

        doc.setFont("helvetica","bold");

        doc.text(
            "Grand Total",
            boxX+5,
            y+4
        );

        doc.text(
            "₹ " + totals.grandTotal.toFixed(2),
            boxX+77,
            y+4,
            {
                align:"right"
            }
        );

        //------------------------------------------------
        // PAYMENT CARD
        //------------------------------------------------

        doc.setFillColor(...COLORS.success);

        doc.roundedRect(
            10,
            currentY,
            95,
            20,
            3,
            3,
            "F"
        );

        doc.setTextColor(255,255,255);

        doc.setFont("helvetica","bold");

        doc.setFontSize(11);

        doc.text(
            "PAYMENT STATUS : PENDING",
            18,
            currentY+12
        );

        doc.setTextColor(...COLORS.dark);

        currentY += 75;

    }

    //----------------------------------------------------
    // BANK DETAILS
    //----------------------------------------------------

    function drawBankDetails(){

        pageBreak(65);

        doc.setFont("helvetica","bold");
        doc.setFontSize(11);

        doc.text(
            "Bank Details",
            10,
            currentY
        );

        doc.setFont("helvetica","normal");
        doc.setFontSize(9);

        currentY += 8;

        doc.text("Bank Name :",10,currentY);
        doc.text(COMPANY.bank,45,currentY);

        currentY += 7;

        doc.text("Account Name :",10,currentY);
        doc.text(COMPANY.name,45,currentY);

        currentY += 7;

        doc.text("Account No :",10,currentY);
        doc.text(COMPANY.account,45,currentY);

        currentY += 7;

        doc.text("IFSC Code :",10,currentY);
        doc.text(COMPANY.ifsc,45,currentY);

        currentY += 7;

        doc.text("UPI ID :",10,currentY);
        doc.text(COMPANY.upi,45,currentY);

        //------------------------------------------------
        // QR BOX
        //------------------------------------------------

        doc.setDrawColor(...COLORS.border);

        doc.rect(
            155,
            currentY-28,
            35,
            35
        );

        doc.setFontSize(8);

        doc.text(
            "QR CODE",
            172.5,
            currentY-8,
            {
                align:"center"
            }
        );

        currentY += 18;

    }

    //----------------------------------------------------
    // DRAW
    //----------------------------------------------------

    drawSummary(totals);

    drawBankDetails();

        //----------------------------------------------------
    // TERMS & CONDITIONS
    //----------------------------------------------------

    function drawTerms(){

        pageBreak(60);

        doc.setFont("helvetica","bold");
        doc.setFontSize(11);

        doc.text(
            "Terms & Conditions",
            10,
            currentY
        );

        doc.setFont("helvetica","normal");
        doc.setFontSize(9);

        currentY += 8;

        const terms=[

            "1. Goods once sold are not returnable.",

            "2. Warranty is applicable only against manufacturing defects.",

            "3. Please preserve this invoice for future reference.",

            "4. Subject to New Delhi jurisdiction only.",

            "5. This is a computer generated invoice and does not require a physical signature."

        ];

        terms.forEach(item=>{

            const text=doc.splitTextToSize(item,120);

            doc.text(
                text,
                10,
                currentY
            );

            currentY+=text.length*5+2;

        });

    }

    //----------------------------------------------------
    // SIGNATURE
    //----------------------------------------------------

    function drawSignature(){

        pageBreak(45);

        doc.setDrawColor(...COLORS.border);

        doc.roundedRect(
            145,
            currentY-5,
            50,
            30,
            3,
            3
        );

        doc.setFont("helvetica","bold");
        doc.setFontSize(10);

        doc.text(
            "Company Stamp",
            170,
            currentY+8,
            {
                align:"center"
            }
        );

        doc.line(
            140,
            currentY+35,
            195,
            currentY+35
        );

        doc.text(
            "Authorized Signatory",
            167,
            currentY+41,
            {
                align:"center"
            }
        );

        currentY+=50;

    }

    //----------------------------------------------------
    // FOOTER
    //----------------------------------------------------

    function drawAllFooters(){

        const totalPages=
            doc.internal.getNumberOfPages();

        for(
            let i=1;
            i<=totalPages;
            i++
        ){

            drawFooter(
                i,
                totalPages
            );

        }

    }

    //----------------------------------------------------
    // FINALIZE
    //----------------------------------------------------

    drawTerms();

    drawSignature();

    drawAllFooters();

    doc.save(
        "Invoice_" +
        invoice.orderId +
        ".pdf"
    );

}