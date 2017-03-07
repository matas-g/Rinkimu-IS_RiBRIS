package lt.javainiai.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class UtilityMethods {

    // Round numbers of type double to selected decimal places.
    public static double round(double value, int places) {
        if (places < 0) {
            throw new IllegalArgumentException();
        }
        BigDecimal bd = new BigDecimal(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

}
