import Image from "next/image";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useMobile } from "../hooks/useMobile";
import { availableLanguageTags, languageTag } from "../src/paraglide/runtime";

const LanguageDropdown = () => {
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false);

  const router = useRouter();
  const isMobilePortrait = useMobile();
  const lang = languageTag();

  const flagDropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(flagDropdownRef, () => {
    setIsFlagDropdownOpen(false);
  });

  return (
    <div
      ref={flagDropdownRef}
      className={
        "relative ml-auto cursor-pointer " + (isMobilePortrait ? " !ml-0" : "")
      }
    >
      <div
        onClick={() => setIsFlagDropdownOpen((p) => !p)}
        className="p-1 px-2 w-[36px] h-[36px] flex justify-center items-center text-white transition-all duration-300 rounded-md select-none bg-slate-800 hover:bg-slate-300 hover:text-slate-800"
      >
        <Image
          className="w-10 cursor-pointer"
          src={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${
            lang === "en" ? "us" : lang
          }.svg`}
          width={30}
          height={20}
          alt={lang}
        />
      </div>
      {isFlagDropdownOpen && (
        <div className="flex flex-col absolute top-[120%] left-0 rounded-md bg-slate-800 shadow-xl">
          {availableLanguageTags.map(
            (tag) =>
              tag !== lang && (
                <div
                  key={tag}
                  onClick={async () => {
                    if (tag === "en") {
                      await router.push("/");
                    } else {
                      await router.push("/" + tag);
                    }
                    setIsFlagDropdownOpen(false);
                  }}
                  className="w-full hover:bg-slate-300 transition-all duration-300 px-2 rounded-[0.30rem]"
                >
                  <Image
                    className="my-3 w-10"
                    src={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${
                      tag === "en" ? "us" : tag
                    }.svg`}
                    width={30}
                    height={20}
                    alt={tag}
                  />
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
