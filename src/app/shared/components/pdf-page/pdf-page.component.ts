import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AssetForDisplay } from '../../models/asset-for-display';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.scss'],
})
export class PdfPageComponent implements OnInit {
  @ViewChild('printWrapper', {static: true}) el!: ElementRef<HTMLImageElement>

  assetsForDisplay!: AssetForDisplay[];
  tableHeaderTitles: string[] = ['Configuration Type', 'Asset', 'Side A', 'Side B', ' Type', ''];
  isHidden: boolean = false;
  currPlatforms!: string[];


  constructor(private file: File,
    private fileOpener: FileOpener,
    public plt: Platform,) { }


  ngOnInit() {
    this.assetsForDisplay = this.demySelections;
    this.currPlatforms = this.plt.platforms();
  }

  onDownloadPdf() {
    console.log(this.el);
    let isCurrPlatformDesktopOrMobileweb: boolean = this.checkPlatform(this.currPlatforms);
    html2canvas(this.el.nativeElement).then((canvas)=>{
      const imgData = canvas.toDataURL('image/jpeg');

      const pdf = new JSPDF({
        orientation: 'portrait'
      })

      const imageProps = pdf.getImageProperties(imgData);

      const pdfw = pdf.internal.pageSize.getWidth();
      const pdfh = (imageProps.height * pdfw) / imageProps.width;

      pdf.addImage(imgData, 'PNG', 0,0, pdfw, pdfh);

      if(isCurrPlatformDesktopOrMobileweb){
        pdf.save();
      }else{
        let blobPdf = new Blob([pdf.output('blob')], {type: 'application/pdf'});
        this.file.writeFile(this.file.dataDirectory, 'output.pdf', blobPdf, {replace: true}).then(fileEntry=>{
          this.fileOpener.open(this.file.dataDirectory + 'output.pdf', 'application/pdf');
        })
      }
    })
  }


  checkPlatform(currPlatforms: string[]){
    let isCurrPlatformDesktopOrMobileweb: boolean = false;
    for(let i = 0; i< currPlatforms.length; i++){
        if(currPlatforms[i] === "desktop"){
          isCurrPlatformDesktopOrMobileweb = true;
        } else if(currPlatforms[i] === "mobileweb"){
          isCurrPlatformDesktopOrMobileweb = true;
        }
        else{
          isCurrPlatformDesktopOrMobileweb = false;
        }
      }
      return isCurrPlatformDesktopOrMobileweb;

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


