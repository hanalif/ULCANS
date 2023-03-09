import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AssetForDisplay } from '../../models/asset-for-display';
import JSPDF, { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.scss'],
  providers: [DatePipe]
})
export class PdfPageComponent implements OnInit {
  @ViewChild('logo', {static: true}) logoEl!: ElementRef<HTMLTableCellElement>

  assetsForDisplay!: AssetForDisplay[];
  tableHeaderTitles: string[] = ['Configuration Type', 'Asset', 'Side A', 'Pattern', 'Side B', 'Pattern',' Type'];
  isHidden: boolean = false;
  currPlatforms!: string[];


  constructor(private file: File,
    private fileOpener: FileOpener,
    public plt: Platform,
    private datePipe: DatePipe) { }


  ngOnInit() {
    this.assetsForDisplay = this.demySelections;
    this.currPlatforms = this.plt.platforms();
  }
  date = this.transformDate(new Date);

  transformDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  onDownloadPdf(){

    const doc = new jsPDF();

    autoTable(doc, {
      html: '.table1',
      didDrawCell: (data: any) => {
        if(data.cell.raw.id === 'logo'){
            console.log(data.cell.styles);
            var td = data.cell.raw;
            var img = td.getElementsByTagName('img')[0];
            doc.addImage(img.src, 'JPEG',data.cell.x,  data.cell.y, data.cell.contentWidth + 13, data.cell.contentHeight + 2);
          }
      },
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: `${this.date}`,
            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content:'Fibrotex'
            +'\n8 Hasivim Street, Petach Tikvah, Israel'
            +'\n+972 9 951 8830',
            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'ULCANS PREFERENCES',
            styles: {
              halign:'left',
              fontSize: 12
            }
          }
        ]
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      html: '.table',
      bodyStyles: {
        valign: 'middle',
        cellWidth: 'wrap',
        halign: 'justify',
        minCellHeight: 15,
        minCellWidth: 20
      },

      didDrawCell: (data: any) => {
        console.log(data)
        var cellId = data.cell.raw.id;
        if( cellId === 'imgEl'){
          console.log(cellId);
          var td = data.cell.raw;
          var img = td.getElementsByTagName('img')[0];
          doc.addImage(img.src, 'JPEG',data.cell.x + 10,  data.cell.y, data.cell.contentWidth + 16, data.cell.contentHeight + 2);
        }
        if(cellId === 'imgElSideA' || cellId === 'imgElSideB'){
          console.log(cellId)
          var td = data.cell.raw;
          var img = td.getElementsByTagName('img')[0];
          doc.addImage(img.src, 'JPEG',data.cell.x,  data.cell.y, data.cell.contentWidth + 10, data.cell.contentHeight);
        }
      },
      theme: 'striped'

    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Terms & notes',
            styles: {
              halign: 'left',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: 'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia'
            +'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum'
            +'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: "plain"
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'This is a centered footer',
            styles: {
              halign: 'center'
            }
          }
        ]
      ],
      theme: "plain"
    });

    return doc.save("invoice");

  }


  onPdf() {

    var doc = new jsPDF();

    // doc.setFontSize(18);
    // doc.text('My PDF Table', 14, 8);
    // doc.setFontSize(11);
    // doc.setTextColor(100);

    (doc as any).autoTable({
      html: '.table1',
      useCss: true,
      putOnlyUsedFonts:true,
      didDrawCell: (data: any) => {
        console.log(data.cell.raw.id)
        if(data.cell.raw.id === 'logo'){
            var td = data.cell.raw;
            var img = td.getElementsByTagName('img')[0];
            doc.addImage(img.src, 'JPEG',data.cell.x,  data.cell.y, data.cell.contentWidth + 13, data.cell.contentHeight + 2);
          }
      }
    })

    var finalY = (doc as any).lastAutoTable.finalY
    // doc.text('From HTML with CSS', 14, finalY + 15)
    autoTable(doc,{
      startY: finalY + 10,
      html: '.table',
      useCss: true,

      didDrawCell: (data: any) => {
        if(data.cell.raw.id === 'imgEl'){
          var td = data.cell.raw;
          var img = td.getElementsByTagName('img')[0];
          doc.addImage(img.src, 'JPEG',data.cell.x,  data.cell.y, data.cell.contentWidth + 13, data.cell.contentHeight + 2);
          }
      }
    })

    doc.save('table.pdf');

    let platform = this.checkPlatform(this.currPlatforms);

    if(platform.desktop || platform.mobileWeb){
      // doc.output('dataurlnewwindow');
      doc.save('table.pdf');
    }

    if(platform.mobile){
      let blobPdf = new Blob([doc.output('blob')], {type: 'application/pdf'});
        this.file.writeFile(this.file.dataDirectory, 'output.pdf', blobPdf, {replace: true}).then(fileEntry=>{
          this.fileOpener.open(this.file.dataDirectory + 'output.pdf', 'application/pdf');
        })
    }

  }


  checkPlatform(currPlatforms: string[]){
    let isCurrPlatformDesktop: boolean = false;
    let isCurrPlatformMobileWeb: boolean = false;
    let isCurrPlatformMobile: boolean = false;
    for(let i = 0; i< currPlatforms.length; i++){
        if(currPlatforms[i] === "desktop"){
          isCurrPlatformDesktop = true;
        } else if(currPlatforms[i] === "mobileweb"){
          isCurrPlatformMobileWeb = true;
        }
        else{
          isCurrPlatformMobile = true;
        }
      }
      return {desktop: isCurrPlatformDesktop, mobileWeb: isCurrPlatformMobileWeb, mobile: isCurrPlatformMobile};

   }


  demySelections: AssetForDisplay[] =
  [
    {
        "id": "2OzGywzL",
        "asset": {
            "id": "ZRXgJ",
            "assetImgUrl": "../../../../assets/imgs/typical-assets/JLTV.png",
            "name": "JLTV",
            "configurationId": "c4",
            "measures": {
                "widthFt": 8.2,
                "heightFt": 8.6,
                "lengthFt": 20.4
            },
            "isInList": true
        },
        "configuratoin": {
            "id": "c4",
            "name": "1B",
            "imgUrl": "../../../../assets/imgs/configurations-imgs/1B.png",
            "hexagon": 1,
            "rhombus": 2,
            "measures": {
                "widthFt": 27.8,
                "lengthFt": 48.3,
                "areaSqFt": 1122.6
            }
        },
        "sideA": {
            "environment": {
                "id": "12bb",
                "typeName": "Desert",
                "imgUrl": "../../../../assets/imgs/environments/png-small/desert7.png",
                "clothPatterns": [
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/1.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/2.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/3.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/4.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/5.png"
                ],
                "shapes": [
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-1.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-2.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-4.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-5.png"
                ]
            },
            "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png"
        },
        "sideB": {
            "environment": {
                "id": "14dd",
                "typeName": "Rocky",
                "imgUrl": "../../../../assets/imgs/environments/png-small/rocky.png",
                "clothPatterns": [
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/1.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/2.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/3.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/4.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/5.png"
                ],
                "shapes": [
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-1.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-2.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-4.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-5.png"
                ]
            },
            "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png"
        },
        "measureType": 1,
        "ulcansType": {
            "id": "TRT",
            "name": "Type II, Communications (R/T)",
            "description": "Type II is radar transparent and used for concealing ground radar equipment."
        }
    },
    {
      "id": "2OzGywzL",
      "asset": {
          "id": "ZRXgJ",
          "assetImgUrl": "../../../../assets/imgs/typical-assets/JLTV.png",
          "name": "JLTV",
          "configurationId": "c4",
          "measures": {
              "widthFt": 8.2,
              "heightFt": 8.6,
              "lengthFt": 20.4
          },
          "isInList": true
      },
      "configuratoin": {
          "id": "c4",
          "name": "1B",
          "imgUrl": "../../../../assets/imgs/configurations-imgs/1B.png",
          "hexagon": 1,
          "rhombus": 2,
          "measures": {
              "widthFt": 27.8,
              "lengthFt": 48.3,
              "areaSqFt": 1122.6
          }
      },
      "sideA": {
          "environment": {
              "id": "12bb",
              "typeName": "Desert",
              "imgUrl": "../../../../assets/imgs/environments/png-small/desert7.png",
              "clothPatterns": [
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/1.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/2.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/3.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/4.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/5.png"
              ],
              "shapes": [
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-1.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-2.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-4.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-5.png"
              ]
          },
          "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png"
      },
      "sideB": {
          "environment": {
              "id": "14dd",
              "typeName": "Rocky",
              "imgUrl": "../../../../assets/imgs/environments/png-small/rocky.png",
              "clothPatterns": [
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/1.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/2.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/3.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/4.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/5.png"
              ],
              "shapes": [
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-1.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-2.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-4.png",
                  "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-5.png"
              ]
          },
          "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png"
      },
      "measureType": 1,
      "ulcansType": {
          "id": "TRT",
          "name": "Type II, Communications (R/T)",
          "description": "Type II is radar transparent and used for concealing ground radar equipment."
      }
  },
  {
    "id": "2OzGywzL",
    "asset": {
        "id": "ZRXgJ",
        "assetImgUrl": "../../../../assets/imgs/typical-assets/JLTV.png",
        "name": "JLTV",
        "configurationId": "c4",
        "measures": {
            "widthFt": 8.2,
            "heightFt": 8.6,
            "lengthFt": 20.4
        },
        "isInList": true
    },
    "configuratoin": {
        "id": "c4",
        "name": "1B",
        "imgUrl": "../../../../assets/imgs/configurations-imgs/1B.png",
        "hexagon": 1,
        "rhombus": 2,
        "measures": {
            "widthFt": 27.8,
            "lengthFt": 48.3,
            "areaSqFt": 1122.6
        }
    },
    "sideA": {
        "environment": {
            "id": "12bb",
            "typeName": "Desert",
            "imgUrl": "../../../../assets/imgs/environments/png-small/desert7.png",
            "clothPatterns": [
                "../../../../assets/imgs/environments/cloth-patterns/Desert/1.png",
                "../../../../assets/imgs/environments/cloth-patterns/Desert/2.png",
                "../../../../assets/imgs/environments/cloth-patterns/Desert/3.png",
                "../../../../assets/imgs/environments/cloth-patterns/Desert/4.png",
                "../../../../assets/imgs/environments/cloth-patterns/Desert/5.png"
            ],
            "shapes": [
                "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-1.png",
                "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-2.png",
                "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png",
                "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-4.png",
                "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-5.png"
            ]
        },
        "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png"
    },
    "sideB": {
        "environment": {
            "id": "14dd",
            "typeName": "Rocky",
            "imgUrl": "../../../../assets/imgs/environments/png-small/rocky.png",
            "clothPatterns": [
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/1.png",
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/2.png",
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/3.png",
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/4.png",
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/5.png"
            ],
            "shapes": [
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-1.png",
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-2.png",
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png",
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-4.png",
                "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-5.png"
            ]
        },
        "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png"
    },
    "measureType": 1,
    "ulcansType": {
        "id": "TRT",
        "name": "Type II, Communications (R/T)",
        "description": "Type II is radar transparent and used for concealing ground radar equipment."
    }
},
{
  "id": "2OzGywzL",
  "asset": {
      "id": "ZRXgJ",
      "assetImgUrl": "../../../../assets/imgs/typical-assets/JLTV.png",
      "name": "JLTV",
      "configurationId": "c4",
      "measures": {
          "widthFt": 8.2,
          "heightFt": 8.6,
          "lengthFt": 20.4
      },
      "isInList": true
  },
  "configuratoin": {
      "id": "c4",
      "name": "1B",
      "imgUrl": "../../../../assets/imgs/configurations-imgs/1B.png",
      "hexagon": 1,
      "rhombus": 2,
      "measures": {
          "widthFt": 27.8,
          "lengthFt": 48.3,
          "areaSqFt": 1122.6
      }
  },
  "sideA": {
      "environment": {
          "id": "12bb",
          "typeName": "Desert",
          "imgUrl": "../../../../assets/imgs/environments/png-small/desert7.png",
          "clothPatterns": [
              "../../../../assets/imgs/environments/cloth-patterns/Desert/1.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/2.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/3.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/4.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/5.png"
          ],
          "shapes": [
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-1.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-2.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-4.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-5.png"
          ]
      },
      "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png"
  },
  "sideB": {
      "environment": {
          "id": "14dd",
          "typeName": "Rocky",
          "imgUrl": "../../../../assets/imgs/environments/png-small/rocky.png",
          "clothPatterns": [
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/1.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/2.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/3.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/4.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/5.png"
          ],
          "shapes": [
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-1.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-2.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-4.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-5.png"
          ]
      },
      "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png"
  },
  "measureType": 1,
  "ulcansType": {
      "id": "TRT",
      "name": "Type II, Communications (R/T)",
      "description": "Type II is radar transparent and used for concealing ground radar equipment."
  }
},
{
  "id": "2OzGywzL",
  "asset": {
      "id": "ZRXgJ",
      "assetImgUrl": "../../../../assets/imgs/typical-assets/JLTV.png",
      "name": "JLTV",
      "configurationId": "c4",
      "measures": {
          "widthFt": 8.2,
          "heightFt": 8.6,
          "lengthFt": 20.4
      },
      "isInList": true
  },
  "configuratoin": {
      "id": "c4",
      "name": "1B",
      "imgUrl": "../../../../assets/imgs/configurations-imgs/1B.png",
      "hexagon": 1,
      "rhombus": 2,
      "measures": {
          "widthFt": 27.8,
          "lengthFt": 48.3,
          "areaSqFt": 1122.6
      }
  },
  "sideA": {
      "environment": {
          "id": "12bb",
          "typeName": "Desert",
          "imgUrl": "../../../../assets/imgs/environments/png-small/desert7.png",
          "clothPatterns": [
              "../../../../assets/imgs/environments/cloth-patterns/Desert/1.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/2.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/3.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/4.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/5.png"
          ],
          "shapes": [
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-1.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-2.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-4.png",
              "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-5.png"
          ]
      },
      "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Desert/shape-3.png"
  },
  "sideB": {
      "environment": {
          "id": "14dd",
          "typeName": "Rocky",
          "imgUrl": "../../../../assets/imgs/environments/png-small/rocky.png",
          "clothPatterns": [
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/1.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/2.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/3.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/4.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/5.png"
          ],
          "shapes": [
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-1.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-2.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-4.png",
              "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-5.png"
          ]
      },
      "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png"
  },
  "measureType": 1,
  "ulcansType": {
      "id": "TRT",
      "name": "Type II, Communications (R/T)",
      "description": "Type II is radar transparent and used for concealing ground radar equipment."
  }
},
    {
        "id": "AM9oy20A",
        "asset": {
            "id": "pSt6X9P7",
            "assetImgUrl": "../../../../assets/imgs/hexagon-bg/asset-bg.png",
            "name": "ff",
            "configurationId": "c8",
            "measures": {
                "widthFt": 1.2195121951219512,
                "heightFt": 1.2195121951219512,
                "lengthFt": 1.2195121951219512
            },
            "isInList": false
        },
        "configuratoin": {
            "id": "c8",
            "name": "4",
            "imgUrl": "../../../../assets/imgs/configurations-imgs/4.png",
            "hexagon": 4,
            "rhombus": 4,
            "measures": {
                "widthFt": 55.8,
                "lengthFt": 80.5,
                "areaSqFt": 3592.4
            }
        },
        "sideA": {
            "environment": {
                "id": "13cc",
                "typeName": "Urban",
                "imgUrl": "../../../../assets/imgs/environments/png-small/urban.png",
                "clothPatterns": [
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/1.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/2.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/3.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/4.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/5.png"
                ],
                "shapes": [
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-1.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-2.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-3.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-4.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-5.png"
                ]
            },
            "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Urban-Rocky/shape-4.png"
        },
        "sideB": {
            "environment": {
                "id": "15ee",
                "typeName": "Snowy",
                "imgUrl": "../../../../assets/imgs/environments/png-small/snowy.png",
                "clothPatterns": [
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/1.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/2.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/3.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/4.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/5.png"
                ],
                "shapes": [
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/shape-1.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/shape-2.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/shape-3.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/shape-4.png",
                    "../../../../assets/imgs/environments/cloth-patterns/Snow/shape-5.png"
                ]
            },
            "clothPatternUrl": "../../../../assets/imgs/environments/cloth-patterns/Snow/shape-3.png"
        },
        "measureType": 1,
        "ulcansType": {
            "id": "TRT",
            "name": "Type II, Communications (R/T)",
            "description": "Type II is radar transparent and used for concealing ground radar equipment."
        }
    }
  ]

}


