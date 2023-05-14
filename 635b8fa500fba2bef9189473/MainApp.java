import java.util.HashMap;

public class MainApp {
  
    public static String phoneWords(String str){
        HashMap<Character, String> phone_code = new HashMap<Character, String>();
        phone_code.put('1', "");
        phone_code.put('2', "abc");
        phone_code.put('3', "def");
        phone_code.put('4', "ghi");
        phone_code.put('5', "jkl");
        phone_code.put('6', "mno");
        phone_code.put('7', "pqrs");
        phone_code.put('8', "tuv");
        phone_code.put('9', "wxyz");
        phone_code.put('0', " ");

        String ret = "";
        while (str.length() > 0) {
            int i=1;
            while (i < str.length() && str.charAt(0) == str.charAt(i) && i < phone_code.get(str.charAt(0)).length()) i++;
            if (str.charAt(0) != '1') ret = ret + phone_code.get(str.charAt(0)).charAt(i-1);
            if (i >= str.length()) str = "";
            else str = str.substring(i,str.length());
        }
        return ret;
    }    

    public static void main(String[] arg) {
        String pW = phoneWords("443355555566604466690277733099966688");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("55282");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("44460208337777833777");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("22266631339277717777");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("66885551555");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("833998");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("000");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("528882");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("55886444833");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("271755533");
        System.out.println(pW);
        System.out.println(">>");
        pW = phoneWords("");
        System.out.println(pW);
    }
}