import en from "./en/common.json";
import pl from "./pl/common.json";
import common from "./common.json";
import { toFlatPropertyMap } from "./utils";

const flatCommon = toFlatPropertyMap(common);

const translations = {
  pl: { ...toFlatPropertyMap(pl), ...flatCommon } as Record<string, string>,
  en: { ...toFlatPropertyMap(en), ...flatCommon } as Record<string, string>,
};

export default translations;
