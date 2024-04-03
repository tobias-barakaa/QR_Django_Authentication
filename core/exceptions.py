from rest_framework.views import exception_handler

def statup_code_handler(exc, context):
    response = exception_handler(exc, context)
    
    if response is not None and response.status_code == 403:
        response.data['status_code'] = 401
        
    return responsecore_exception_handler