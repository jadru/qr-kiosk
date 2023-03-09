import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './lib/multerOptions';
import UploadService from './upload.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('uploads')
@ApiTags('이미지')
export default class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    // FilesInterceptor 첫번째 매개변수: formData의 key값,
    // 두번째 매개변수: 파일 최대 갯수
    // 세번째 매개변수: 파일 설정 (위에서 작성했던 multer 옵션들)
    @Post('/')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: '이미지 저장 API' })
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            images: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })    
    @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
    public uploadFiles(@UploadedFiles() files: File[]) {
        const uploadedFiles: string[] = this.uploadService.uploadFiles(files);

        return {
            status: 200,
            message: '파일 업로드를 성공하였습니다.',
            data: {
                files: uploadedFiles,
            },
        };
    }
}


