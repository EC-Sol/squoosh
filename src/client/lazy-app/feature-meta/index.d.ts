import * as webPEncoderMeta from '../../../features/encoders/webP/shared/meta';
import * as wp2EncoderMeta from '../../../features/encoders/wp2/shared/meta';
import * as qoiEncoderMeta from '../../../features/encoders/qoi/shared/meta';
import * as oxiPNGEncoderMeta from '../../../features/encoders/oxiPNG/shared/meta';
import * as mozJPEGEncoderMeta from '../../../features/encoders/mozJPEG/shared/meta';
import * as jxlEncoderMeta from '../../../features/encoders/jxl/shared/meta';
import * as browserPNGEncoderMeta from '../../../features/encoders/browserPNG/shared/meta';
import * as browserJPEGEncoderMeta from '../../../features/encoders/browserJPEG/shared/meta';
import * as browserGIFEncoderMeta from '../../../features/encoders/browserGIF/shared/meta';
import * as avifEncoderMeta from '../../../features/encoders/avif/shared/meta';
import * as webPEncoderEntry from '../../../features/encoders/webP/client';
import * as wp2EncoderEntry from '../../../features/encoders/wp2/client';
import * as oxiPNGEncoderEntry from '../../../features/encoders/oxiPNG/client';
import * as mozJPEGEncoderEntry from '../../../features/encoders/mozJPEG/client';
import * as jxlEncoderEntry from '../../../features/encoders/jxl/client';
import * as avifEncoderEntry from '../../../features/encoders/avif/client';
export type EncoderState = {
    type: "webP";
    options: webPEncoderMeta.EncodeOptions;
} | {
    type: "wp2";
    options: wp2EncoderMeta.EncodeOptions;
} | {
    type: "qoi";
    options: qoiEncoderMeta.EncodeOptions;
} | {
    type: "oxiPNG";
    options: oxiPNGEncoderMeta.EncodeOptions;
} | {
    type: "mozJPEG";
    options: mozJPEGEncoderMeta.EncodeOptions;
} | {
    type: "jxl";
    options: jxlEncoderMeta.EncodeOptions;
} | {
    type: "browserPNG";
    options: browserPNGEncoderMeta.EncodeOptions;
} | {
    type: "browserJPEG";
    options: browserJPEGEncoderMeta.EncodeOptions;
} | {
    type: "browserGIF";
    options: browserGIFEncoderMeta.EncodeOptions;
} | {
    type: "avif";
    options: avifEncoderMeta.EncodeOptions;
};
export type EncoderOptions = webPEncoderMeta.EncodeOptions | wp2EncoderMeta.EncodeOptions | qoiEncoderMeta.EncodeOptions | oxiPNGEncoderMeta.EncodeOptions | mozJPEGEncoderMeta.EncodeOptions | jxlEncoderMeta.EncodeOptions | browserPNGEncoderMeta.EncodeOptions | browserJPEGEncoderMeta.EncodeOptions | browserGIFEncoderMeta.EncodeOptions | avifEncoderMeta.EncodeOptions;
export declare const encoderMap: {
    webP: {
        encode: (signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: webPEncoderMeta.EncodeOptions) => Promise<Promise<ArrayBuffer>>;
        Options: typeof webPEncoderEntry.Options;
        meta: typeof webPEncoderMeta;
    };
    wp2: {
        encode: (signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: wp2EncoderMeta.EncodeOptions) => Promise<Promise<ArrayBuffer>>;
        Options: typeof wp2EncoderEntry.Options;
        meta: typeof wp2EncoderMeta;
    };
    qoi: {
        encode(signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: qoiEncoderMeta.EncodeOptions): Promise<Promise<ArrayBuffer>>;
        meta: typeof qoiEncoderMeta;
    };
    oxiPNG: {
        encode(signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: oxiPNGEncoderMeta.EncodeOptions): Promise<ArrayBuffer>;
        Options: typeof oxiPNGEncoderEntry.Options;
        meta: typeof oxiPNGEncoderMeta;
    };
    mozJPEG: {
        encode(signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: mozJPEGEncoderMeta.EncodeOptions): Promise<Promise<ArrayBuffer>>;
        Options: typeof mozJPEGEncoderEntry.Options;
        meta: typeof mozJPEGEncoderMeta;
    };
    jxl: {
        encode: (signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: jxlEncoderMeta.EncodeOptions) => Promise<Promise<ArrayBuffer>>;
        Options: typeof jxlEncoderEntry.Options;
        meta: typeof jxlEncoderMeta;
    };
    browserPNG: {
        encode: (signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: browserPNGEncoderMeta.EncodeOptions) => Promise<Blob>;
        meta: typeof browserPNGEncoderMeta;
    };
    browserJPEG: {
        encode: (signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: browserJPEGEncoderMeta.EncodeOptions) => Promise<Blob>;
        Options: new (...args: any[]) => import("../../../features/client-utils").QualityOptionsInterface;
        meta: typeof browserJPEGEncoderMeta;
    };
    browserGIF: {
        featureTest: () => Promise<boolean>;
        encode: (signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: browserGIFEncoderMeta.EncodeOptions) => Promise<Blob>;
        meta: typeof browserGIFEncoderMeta;
    };
    avif: {
        encode: (signal: AbortSignal, workerBridge: import("../worker-bridge").default, imageData: ImageData, options: avifEncoderMeta.EncodeOptions) => Promise<Promise<ArrayBuffer>>;
        Options: typeof avifEncoderEntry.Options;
        meta: typeof avifEncoderMeta;
    };
};
export type EncoderType = keyof typeof encoderMap;
import * as resizeProcessorMeta from '../../../features/processors/resize/shared/meta';
import * as quantizeProcessorMeta from '../../../features/processors/quantize/shared/meta';
interface Enableable {
    enabled: boolean;
}
export interface ProcessorOptions {
    resize: resizeProcessorMeta.Options;
    quantize: quantizeProcessorMeta.Options;
}
export interface ProcessorState {
    resize: Enableable & resizeProcessorMeta.Options;
    quantize: Enableable & quantizeProcessorMeta.Options;
}
export declare const defaultProcessorState: ProcessorState;
import * as rotatePreprocessorMeta from '../../../features/preprocessors/rotate/shared/meta';
export interface PreprocessorState {
    rotate: rotatePreprocessorMeta.Options;
}
export declare const defaultPreprocessorState: PreprocessorState;
export {};
