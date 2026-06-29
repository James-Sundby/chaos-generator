"use client";

import TradingCardPaneBase from "@/app/components/generator/panes/tradingCardPaneBase";
import { modelConfig } from "@/lib/factions/eldar/model";

export default function EldarTradingCardPane(props) {
    return <TradingCardPaneBase {...props} modelConfig={modelConfig} />;
}