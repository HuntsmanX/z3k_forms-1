import $ from "jquery";
import defaults from "lodash/defaults";

const handleSuccess = (data, textStatus, jqXHR) => {}

const handleError = (jqXHR, textStatus, errorThrown) => {
  if (jqXHR.status === 422) return;

  let message = `Server error occured\n\nStatus code: ${jqXHR.status}\nError message: ${errorThrown}`;
  if (jqXHR.responseJSON && jqXHR.responseJSON.exception)
    message += `\n\n${jqXHR.responseJSON.exception}`;

  alert(message);
}

const setDefaults = (options) => {
  defaults(options, {
    url:         '/',
    method:      'GET',
    dataType:    'json',
    prefix:      '/v1/forms',
    contentType: 'application/json',
    headers:     { 'X-Key-Inflection' : 'camel' }
  });
}

const ajax = (options = {}) => {
  setDefaults(options);

  const baseURL = options.prefix ? ENV_API_URL + options.prefix : ENV_API_URL;

  options.url  = baseURL + options.url;
  options.data = options.method === 'GET' ?
    options.payload :
    JSON.stringify(options.payload)

  const request = $.ajax(options);

  request.then(handleSuccess, handleError);

  return request;
}

export default ajax;
