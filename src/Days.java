import java.util.HashMap;

public class Days {
    public static void main(String[] args) throws Exception {
        HashMap<String, String> weekDays = new HashMap<String, String>();

        weekDays.put("SEG", "Segunda-feira");
        weekDays.put("TER", "Terça-feira");
        weekDays.put("QUA", "Quarta-feira");
        weekDays.put("QUI", "Quinta-feira");
        weekDays.put("SEX", "Sexta-feira");
        weekDays.put("SAB", "Sábado");
        weekDays.put("DOM", "Domingo");

        System.out.println("\nMostrando todos os pares armazedados");
        System.out.println(weekDays);

        System.out.println("\nVerificando se um item existe");
        System.out.println("'QUA' existe? " + (weekDays.containsKey("QUA") ? "Sim" : "Não"));

        System.out.println("'XYZ' existe? " + (weekDays.containsKey("XYZ") ? "Sim" : "Não"));

        System.out.println("\nBuscando um item (QUA)");
        System.out.println(weekDays.get("QUA"));

        System.out.println("\nA quantidade de pares é: " + weekDays.size());

        System.out.println("\nRemovendo um item (TER)");
        System.out.println(weekDays.remove("TER"));

        System.out.println("\nA quantidade de pares é: " + weekDays.size());

        System.out.println("\nPercorrendo o HashMap a partir do conjunto de chaves");
        for (String item : weekDays.keySet()) {
            System.out.println(item);
        }

        System.out.println("\nPercorrendo o HashMap a partir do conjunto de valores");
        for (String item : weekDays.values()) {
            System.out.println(item);
        }

        System.out.println("\nRemovendo todos os itens...");

        weekDays.clear();

        System.out.println("\nA quantidade de pares é: " + weekDays.size() + "\n");
    }
}
