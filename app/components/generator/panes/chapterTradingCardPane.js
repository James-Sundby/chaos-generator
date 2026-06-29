"use client";

import TradingCardPaneBase from "@/app/components/generator/panes/tradingCardPaneBase";
import { modelConfig } from "@/lib/factions/chapter/model";

export default function ChapterTradingCardPane(props) {
    return <TradingCardPaneBase {...props} modelConfig={modelConfig} />;
}