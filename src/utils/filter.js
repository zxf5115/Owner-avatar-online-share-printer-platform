

/**
 * 格式化普通内容
 * @param data
 * @returns 格式后的数据
 */
export function emptyData (data)
{
  let response = data

  if (data == '' || data === '' || data == 0 || data == null || data === undefined || data === 'undefined')
  {
    response = window.vm.$t('common.empty')
  }

  return response
}


/**
 * 时长
 * @param {*} value
 */
export function datetime (value)
{
  if (0 == value || '' == value)
  {
    return window.vm.$t('common.empty')
  }

  value = value * 1000;

  let date = new Date(value);

  let y = date.getFullYear();
  let m = date.getMonth() + 1;

  m = m < 10 ? ('0' + m) : m;

  let d = date.getDate();

  d = d < 10 ? ('0' + d) : d;

  let h = date.getHours();

  h = h < 10 ? ('0' + h) : h;

  let minute = date.getMinutes();
  let second = date.getSeconds();

  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;

  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}



/**
 * 时长
 * @param {*} value
 */
export function timeLength (value)
{
  let day = 0
  let hour = 0
  let minutes = 0
  let seconds = 0

  if (0 == value || '' == value)
  {
    return window.vm.$t('common.empty')
  }

  day = Math.floor(value / (3600 * 24));

  day = day > 0 ? day + ' 天 ' : '';

  hour = Math.floor((value % (3600 * 24)) / 3600);

  hour = hour > 0 ? hour + ' 小时 ' : '';

  minutes = Math.floor(((value % (3600 * 24)) % 3600) / 60);

  minutes = minutes > 0 ? minutes + ' 分钟 ' : '';

  seconds = Math.floor(((value % (3600 * 24)) % 3600 % 60));

  seconds = seconds > 0 ? seconds + ' 秒 ' : '';

  return day + hour + minutes + seconds;
}
