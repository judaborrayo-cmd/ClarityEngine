// Stable references for future authored visuals. No image files are required.
export const caseAssetIds = {
  offer: {
    before: "case_offer_visual_before",
    after: "case_offer_visual_after",
    comparison: "case_offer_visual_comparison",
    problem: "case_offer_icon_problem",
    customerValue: "case_offer_icon_customer_value",
  },
  audience: "case_audience_visual_01",
  message: "case_message_visual_01",
  conversion: "case_conversion_visual_01",
  traffic: "case_traffic_visual_01",
  measurement: "case_measurement_visual_01",
} as const;
export type CaseAssetId =
  | (typeof caseAssetIds.offer)[keyof typeof caseAssetIds.offer]
  | Exclude<
      (typeof caseAssetIds)[keyof typeof caseAssetIds],
      typeof caseAssetIds.offer
    >;
export interface CaseAsset {
  src: string;
  alt: string;
  caption?: string;
  blur?: boolean;
  redacted?: boolean;
}
export type CaseAssetMap = Partial<Record<CaseAssetId, CaseAsset>>;
export const categoryCaseAsset: Record<number, CaseAssetId> = {
  2: caseAssetIds.audience,
  3: caseAssetIds.message,
  4: caseAssetIds.conversion,
  5: caseAssetIds.traffic,
  6: caseAssetIds.measurement,
};
