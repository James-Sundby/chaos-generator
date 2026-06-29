"use client";

import TradingCardPaneBase from "@/app/components/generator/panes/tradingCardPaneBase";
import { modelConfig } from "@/lib/factions/chaos/model";

export default function ChaosTradingCardPane(props) {
    return <TradingCardPaneBase {...props} modelConfig={modelConfig} />;
}