"use client";

import TradingCardPaneBase from "@/app/components/generator/panes/tradingCardPaneBase";
import { modelConfig } from "@/lib/factions/sisters/model";

export default function SistersTradingCardPane(props) {
    return <TradingCardPaneBase {...props} modelConfig={modelConfig} />;
}