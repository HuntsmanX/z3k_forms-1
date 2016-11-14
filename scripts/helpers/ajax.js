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
  });
}

const ajax = (options = {}) => {
  setDefaults(options);

  const request = $.ajax({
    url:         ENV_API_URL + options.url,
    type:        options.method,
    dataType:    options.dataType,
    contentType: options.contentType,
    data:        JSON.stringify(options.payload)
  });

  request.then(handleSuccess, handleError);

  return request;
}

export default ajax;
