import { Helper } from './helper'
import axios from 'axios'
import * as fs from 'fs-extra'
import { statSync } from 'fs'
import * as md5File from 'md5-file'
//import { PACKDIR_UPLOAD } from '../utils/constants'

const FormData = require('form-data')

export class BaiduHelper extends Helper {

	public show_access_token(): string {
		console.log('acc tok: ', this.access_token)
		return this.access_token
	}

	public async upload(pathname: string, token: string): Promise<void> {
		console.log('上传文件name in helper：', pathname)
    const fileStream = await fs.createReadStream(pathname);
    const secret = 'kfi8i#W0df';
    const form = new FormData();
    form.append('secret', secret);
    form.append('file', fileStream);

    //const pathRoot = '/packdir/pd/'
    const pathRoot = '/apps/pd/'

		const stats = statSync(pathname)
		const fileSizeInBytes = stats.size

		const md5 = md5File.sync(pathname)

		const filename = pathname.split('/').pop()

    const form2 = new FormData();
    const pathEncoded = encodeURI(pathRoot + filename)
    form2.append('path', pathEncoded);
    form2.append('size', fileSizeInBytes);
    form2.append('isdir', 0);
    form2.append('block_list', '["' + md5 + '"]');
    form2.append('autoinit', 1);

		const url = 'https://pan.baidu.com/rest/2.0/xpan/file?method=precreate&access_token=' + this.access_token
		const url0 = 'https://pan.baidu.com/rest/2.0/xpan/file'
		console.log('-----')
		console.log('url: ', url)
		console.log('-----')

		this.precreate(form2, token, url, pathEncoded)
	}

	private async precreate(args: any, token: string, url: string, pathEncoded: string): Promise<void> {
		//// 1. Get access_token from packdir.com.
		//const tokenfile = path.join(os.homedir(), '.packdir',	'token')
		//if (!existsSync(tokenfile)) {
		//	this.log('You are not logged in.')
		//	return
		//}
    console.log('aaaaaaaaaaaa: ', args)
    console.log('aaaaaaaaaaaa:  args')
    console.log('rul:  args', url)
    console.log('this.access_token:  args', this.access_token)
    const result = await axios.post(
      url,
      args,
      {
                //'maxBodyLength': Infinity,
        		//'maxContentLength': Infinity,
        headers: {
          "User-Agent": "pan.baidu.com"
        			//  'Authorization': 'Bearer ' + token,
        },
        params: {
          "method": 'precreate',
          "access_token": this.access_token,
        },
      }
    )
    console.log('预上传结果b tok: ', result.data)

    this.uploadSegments(result.data.uploadid, pathEncoded, [])
  }

  private async uploadSegments(uploadid: string, pathEncoded: string, segments: []): Promise<void> {

    const url = `https://d.pcs.baidu.com/rest/2.0/pcs/superfile2?access_token=${this.access_token}&method=upload&type=tmpfile&path=${pathEncoded}&uploadid=${uploadid}&partseq=0`

    const form = new FormData();
    form.append('path', pathEncoded);
    form.append('size', fileSizeInBytes);
    form.append('isdir', 0);
    form.append('block_list', '["' + md5 + '"]');
    form.append('autoinit', 1);

    //curl -F 'file=@/Downloads/filename.jpg' "https://d.pcs.baidu.com/rest/2.0/pcs/superfile2?access_token=xxx&method=upload&type=tmpfile&path=/apps/AppName/filename.jpg&uploadid=N1-NjEuMTM1LjE2OS44NDoxNTQ1OTY1NTQyOjgzODMxMTY0MDkyNDY2NjQ5Nzg&partseq=0"
    /*
    for (let i of segments) {
        let data = await upgetfile({ url, i })
        await uploadfile(i,data,uploadid) // 循环上传需要上传的分片
    }
    // https://pan.baidu.com/rest/2.0/xpan/file?method=create 
 
    // 下面的操作是上传完成合成文件
    let data = {
        path:encodeURI('/app/服务器备份/baidu.exe'), // 与上面那个一定要相同 而且还是需要url编码
        size: daxiao, // 这个就是上传的大小，而且是总大小，不是分片的大小
        isdir:0,
        rtype: 1,
        uploadid, // 这个就是上面返回的uploadid
        block_list:JSON.stringify(promistlist) // 这个就是上传的MD5列表，还是全部的
 
    }
    let s = '' // 需要formdata格式
    for(let i in data){
        s += i + "=" + data[i] + '&'
    }
    console.log(s)
    await axios.post('https://pan.baidu.com/rest/2.0/xpan/file?method=create',s,{
        params:{
            access_token: '你的token',
        }
    }).then((res)=>{
        console.log(res)
    })
    */
  }
}
