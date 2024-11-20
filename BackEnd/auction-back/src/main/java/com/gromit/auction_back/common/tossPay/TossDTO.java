package com.gromit.auction_back.common.tossPay;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TossDTO {
    private int usercode;
    private int amount;
}
