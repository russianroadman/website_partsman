package kislovalexander.website;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

    // order number
    private static int orderNumber;

    @GetMapping("/")
    public String catalogPageRequest(Model model) {
        Iterable<String[]> items = StoredFunctions.getSearchResult("");
        Iterable<String> partsOptions = StoredFunctions.getPartsOptions();
        Iterable<String> setsOptions = StoredFunctions.getSetsOptions();
        Iterable<String> toolsOptions = StoredFunctions.getToolsOptions();
        Iterable<String> liquidsOptions = StoredFunctions.getLiquidsOptions();
        model.addAttribute("items", items);
        model.addAttribute("partsOptions", partsOptions);
        model.addAttribute("setsOptions", setsOptions);
        model.addAttribute("toolsOptions", toolsOptions);
        model.addAttribute("liquidsOptions", liquidsOptions);
        return "catalog";
    }

    @GetMapping("/info")
    public String infoPageRequest() {
        return "info";
    }

    @GetMapping("/cart")
    public String cartPageRequest() {
        return "cart";
    }

    @GetMapping("/order")
    public String orderPageRequest(Model model) {
        model.addAttribute("orderNumber", Integer.toString(orderNumber));
        return "order";
    }

    @PostMapping("/")
    public String catalogSearchResultPageRequest(Model model, @RequestParam String type, @RequestParam String category, @RequestParam String query){
        Iterable<String[]> items;
        if (category.equals("choose")){
            items = StoredFunctions.getSearchResult(query);
            System.out.println(query);
        } else {
            items = StoredFunctions.getItems(type, category);
        }
        Iterable<String> partsOptions = StoredFunctions.getPartsOptions();
        Iterable<String> setsOptions = StoredFunctions.getSetsOptions();
        Iterable<String> toolsOptions = StoredFunctions.getToolsOptions();
        Iterable<String> liquidsOptions = StoredFunctions.getLiquidsOptions();
        model.addAttribute("items", items);
        model.addAttribute("partsOptions", partsOptions);
        model.addAttribute("setsOptions", setsOptions);
        model.addAttribute("toolsOptions", toolsOptions);
        model.addAttribute("liquidsOptions", liquidsOptions);
        return "catalog";
    }

    @PostMapping("/cart")
    public String cartSubmit(@RequestParam String serial,
                             @RequestParam String price,
                             @RequestParam String name,
                             @RequestParam String qtty,
                             @RequestParam String lastname,
                             @RequestParam String firstname,
                             @RequestParam String middlename,
                             @RequestParam String phone,
                             @RequestParam String delivery,
                             @RequestParam String agreement
                             ){
        phone = phone.replaceAll("[^\\d.]", "");
        StoredFunctions.submitOrder(serial.split(","), name.split(","), qtty.split(","), lastname, firstname, middlename, phone, delivery, agreement);
        orderNumber = StoredFunctions.getOrderId(firstname, lastname, middlename, phone);
        return "redirect:order";
    }

}
