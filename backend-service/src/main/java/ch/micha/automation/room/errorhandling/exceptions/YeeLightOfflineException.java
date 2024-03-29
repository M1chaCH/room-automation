package ch.micha.automation.room.errorhandling.exceptions;

import ch.micha.automation.room.errorhandling.ErrorMessageDTO;
import jakarta.ws.rs.core.Response;
import lombok.Getter;

@Getter
public class YeeLightOfflineException extends AppException{
    private final String deviceIp;
    private final String deviceName;

    public YeeLightOfflineException(String ip, String name) {
        super(String.format("tried to call to offline device { ip:%s, name:%s }", ip, name), null, false);
        this.deviceIp = ip;
        this.deviceName = name;
    }

    @Override
    public Response getResponse() {
        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity(getErrorMessage())
                .build();
    }

    @Override
    public ErrorMessageDTO getErrorMessage() {
        return new ErrorMessageDTO("can't change offline light",
            String.format("tried to call to offline device { ip:%s, name:%s }", deviceIp, deviceName), "");
    }
}
