import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

export class FFMPEG {

    // Types

    private static instance: FFMPEG | null = null;
    ffmpeg: FFmpeg;
    url?: string;


    // State

    state = {

    }

    // Constr

    constructor() {

        this.ffmpeg = createFFmpeg({ log: true });

    }

    // Singleton Getter

    public static getInstance(): FFMPEG {
        return this.instance ??= new FFMPEG();
    }


    // Loader

    async load() {



        try {

            await this.ffmpeg.load();

        } catch (error: any) {

            console.log(error, " error");


        }

    }



    // Video to GIF

    async toGif(video: File): Promise<string> {

        try {

            this.ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

            await this.ffmpeg.run('-i', 'test.mp4', '-vf', 'fps=10', '-t', '5', '-ss', '2.0', '-f', 'gif', 'out.gif');

            const data = this.ffmpeg.FS('readFile', 'out.gif');

            const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
            this.url = url;

            console.log(this.url);


            return this.url;

        } catch (e: any) {

            console.log(e.message);

            return e as string;

        }

    }

    // mp4 to mp3



}