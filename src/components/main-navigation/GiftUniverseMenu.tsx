import React from 'react';
import SubMenuSection from '../navigation/SubMenuSection';

const GiftUniverseMenu = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SubMenuSection
        title="Pack Composé"
        items={[
          {
            href: "/univers-cadeaux/packprestige",
            title: "Pack Prestige",
            description: "Notre collection prestige"
          },
          {
            href: "/univers-cadeaux/packpremuim",
            title: "Pack Premium",
            description: "Collection premium"
          },
          {
            href: "/univers-cadeaux/packtrio",
            title: "Pack Trio",
            description: "Ensemble de trois pièces"
          },
          {
            href: "/univers-cadeaux/packduo",
            title: "Pack Duo",
            description: "Ensemble de deux pièces"
          },
          {
            href: "/univers-cadeaux/packminiduo",
            title: "Pack Mini Duo",
            description: "Petit ensemble duo"
          }
        ]}
      />
      <SubMenuSection
        title="Pack Mono"
        items={[
          {
            href: "/univers-cadeaux/packchemise",
            title: "Pack Chemise",
            description: "Pack chemise exclusive"
          },
          {
            href: "/univers-cadeaux/packceinture",
            title: "Pack Ceinture",
            description: "Pack ceinture élégante"
          },
          {
            href: "/univers-cadeaux/packcravatte",
            title: "Pack Cravatte",
            description: "Pack cravatte raffinée"
          },
          {
            href: "/univers-cadeaux/packmalette",
            title: "Pack Malette",
            description: "Pack malette professionnelle"
          }
        ]}
      />
    </div>
  );
};

export default GiftUniverseMenu;