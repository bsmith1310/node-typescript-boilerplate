// COPIED FROM FRONTEND

class MediaUrlUtils {

  private static UrlSeparator = '/';
  private static FsSeparator = '\\';

  public static GetGroup(url:string):string {
    let parts = MediaUrlUtils.GetNameParts(url);
    parts.pop();
    if (MediaUrlUtils.IsThumbnail(url)) {
      parts.pop();
    }
    return parts.length > 1 ? parts[parts.length-1] : '';
  }
  public static GetCacheFsPathAbsolute(basePath:string, url:string):string {
    let absolute = basePath + this.FsSeparator + this.GetFsPathRelative(url) + this.FsSeparator + this.GetBaseName(url);
    return replaceAll(absolute, this.FsSeparator + this.FsSeparator, this.FsSeparator);
  }
  public static GetCachItemFsPathAbsolute(basePath:string, url:string, itemKey:string):string {
    let absolute = basePath + this.FsSeparator + this.GetFsPathRelative(url) + this.FsSeparator + this.GetBaseName(url) + this.FsSeparator + itemKey;
    return replaceAll(absolute, this.FsSeparator + this.FsSeparator, this.FsSeparator);
  }
  public static GetFsPathRelative(url:string):string {
    let ix = url.lastIndexOf('/');
    let path = url.substring(0, ix);
    return replaceAll(path, this.UrlSeparator, this.FsSeparator);
  }
  public static GetFsPathAbsolute(basePath:string, url:string):string {
    let absolute = basePath + this.FsSeparator + this.GetFsPathRelative(url);
    return replaceAll(absolute, this.FsSeparator + this.FsSeparator, this.FsSeparator);
  }
  public static GetFsFullPathAbsolute(basePath:string, url:string):string {
    let absolute = basePath + this.FsSeparator + this.GetFsPathRelative(url) + this.FsSeparator + this.GetName(url);
    absolute = replaceAll(absolute, this.UrlSeparator, this.FsSeparator);
    return replaceAll(absolute, this.FsSeparator + this.FsSeparator, this.FsSeparator);
  }
  public static GetBaseName(url:string):string {
    let parts = MediaUrlUtils.GetNameParts(url);
    return parts[0];
  }
  public static IsThumbnail(url:string):boolean {
    let parts = MediaUrlUtils.GetNameParts(url);
    return parts[parts.length-2] === 'tn';
  }
  private static GetNameParts(url:string):string[] {
    let ix = url.lastIndexOf('/');
    let name = '';
    if (ix !== -1) {
      name = url.substring(ix+1);
    }
    let parts = name.split('.');
    if (parts.length < 2) {
      throw new Error('Expected more parts');
    }
    return parts;
  }
  private static GetName(url:string):string {
    let ix = url.lastIndexOf('/');
    return url.substring(ix);
  }
}

export default MediaUrlUtils;

function escapeRegExp(str:string):string {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str:string, find:string, replace:string):string {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}