import $ from "jquery";
import defaults from "lodash/defaults";

const handleSuccess = (data, textStatus, jqXHR) => {}

const handleError = (jqXHR, textStatus, errorThrown) => {
  if (jqXHR.status === 422) return;

  alert(
    `Server error occured :(\n\nStatus code: ${jqXHR.status}\nError message: ${errorThrown}`
  );
}

const setDefaults = (options) => {
  defaults(options, {
    url:         '/',
    method:      'GET',
    dataType:    'json',
    contentType: 'application/json',
    headers:     { 'X-Key-Inflection' : 'camel' }
  });
}

const ajax = (options = {}) => {
  setDefaults(options);

  options.url  = ENV_API_URL + options.url;
  
  if (options.method === 'GET'){
    options.data = options.payload;
  } else {
    options.data = JSON.stringify(options.payload);
  }

  const request = $.ajax(options);

  request.then(handleSuccess, handleError);

  return request;
}

export default ajax;
