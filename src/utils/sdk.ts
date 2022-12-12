import sdk from 'zmp-sdk';

const { platform } = sdk.getSystemInfo();

export const isIos = platform === 'iOS';

export const openExternal = (url: string) => {
  const { ZJSBridge } = window as any;
  ZJSBridge.callCustomAction("action.open.outapp", { url }, () => console.log('Open outapp', url));
}

export default sdk;