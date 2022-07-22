import { GlobalStateSlot } from "@mui/base";
import { CSSInterpolation } from "@mui/system";
import {
  AspectRatioProps,
  AspectRatioSlot,
} from "../AspectRatio/AspectRatioProps";
import { AvatarProps, AvatarSlot } from "../Avatar/AvatarProps";
import {
  AvatarGroupProps,
  AvatarGroupSlot,
} from "../AvatarGroup/AvatarGroupProps";
import { BadgeProps, BadgeSlot } from "../Badge/BadgeProps";
import { BoxProps, BoxSlot } from "../Box/BoxProps";
import { ButtonProps, ButtonSlot } from "../Button/ButtonProps";
import { CardProps, CardSlot } from "../Card/CardProps";
import {
  CardContentProps,
  CardContentSlot,
} from "../CardContent/CardContentProps";
import { CardCoverProps, CardCoverSlot } from "../CardCover/CardCoverProps";
import {
  CardOverflowProps,
  CardOverflowSlot,
} from "../CardOverflow/CardOverflowProps";
import { CheckboxProps, CheckboxSlot } from "../Checkbox/CheckboxProps";
import { ContainerProps, ContainerSlot } from "../Container/ContainerProps";
import {
  FormHelperTextProps,
  FormHelperTextSlot,
} from "../FormHelperText/FormHelperTextProps";
import { FormLabelProps, FormLabelSlot } from "../FormLabel/FormLabelProps";
import { IconButtonProps, IconButtonSlot } from "../IconButton/IconButtonProps";
import { InputProps, InputSlot } from "../Input/InputProps";
import { LinkProps, LinkSlot } from "../Link/LinkProps";
import { ListProps, ListSlot } from "../List/ListProps";
import {
  ListDividerProps,
  ListDividerSlot,
} from "../ListDivider/ListDividerProps";
import { ListItemProps, ListItemSlot } from "../ListItem/ListItemProps";
import {
  ListItemButtonProps,
  ListItemButtonSlot,
} from "../ListItemButton/ListItemButtonProps";
import {
  ListItemContentProps,
  ListItemContentSlot,
} from "../ListItemContent/ListItemContentProps";
import {
  ListItemDecoratorProps,
  ListItemDecoratorSlot,
} from "../ListItemDecorator/ListItemDecoratorProps";
import { SheetProps, SheetSlot } from "../Sheet/SheetProps";
import { SvgIconProps, SvgIconSlot } from "../SvgIcon/SvgIconProps";
import { SwitchProps, SwitchSlot } from "../Switch/SwitchProps";
import { TextFieldProps, TextFieldSlot } from "../TextField/TextFieldProps";
import { TypographyProps, TypographySlot } from "../Typography/TypographyProps";
import { ChipProps, ChipSlot } from "../Chip/ChipProps";
import { ChipDeleteProps, ChipDeleteSlot } from "../ChipDelete/ChipDeleteProps";
import { SliderProps, SliderSlot } from "../Slider/SliderProps";
import { RadioProps, RadioSlot } from "../Radio/RadioProps";
import { RadioGroupProps, RadioGroupSlot } from "../RadioGroup/RadioGroupProps";

export type OverridesStyleRules<
  ClassKey extends string = string,
  ComponentProps = Record<string, unknown>,
  Theme = unknown
> = Partial<
  Record<
    Exclude<ClassKey, GlobalStateSlot>,
    | CSSInterpolation
    | ((
        // Record<string, unknown> is for other props that the slot receive internally
        // Documenting all ownerStates could be a huge work, let's wait until we have a real needs from developers.
        props: {
          ownerState: ComponentProps & Record<string, unknown>;
          theme: Theme;
        } & Record<string, unknown>
      ) => CSSInterpolation)
  >
>;
export interface Components<Theme = unknown> {
  // alphabetical order
  RadAspectRatio?: {
    defaultProps?: Partial<AspectRatioProps>;
    styleOverrides?: OverridesStyleRules<
      AspectRatioSlot,
      AspectRatioProps,
      Theme
    >;
  };
  RadAvatar?: {
    defaultProps?: Partial<AvatarProps>;
    styleOverrides?: OverridesStyleRules<AvatarSlot, AvatarProps, Theme>;
  };
  RadAvatarGroup?: {
    defaultProps?: Partial<AvatarGroupProps>;
    styleOverrides?: OverridesStyleRules<
      AvatarGroupSlot,
      AvatarGroupProps,
      Theme
    >;
  };
  RadBadge?: {
    defaultProps?: Partial<BadgeProps>;
    styleOverrides?: OverridesStyleRules<BadgeSlot, BadgeProps, Theme>;
  };
  RadBox?: {
    defaultProps?: Partial<BoxProps>;
    styleOverrides?: OverridesStyleRules<BoxSlot, BoxProps, Theme>;
  };
  RadButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: OverridesStyleRules<ButtonSlot, ButtonProps, Theme>;
  };
  RadCard?: {
    defaultProps?: Partial<CardProps>;
    styleOverrides?: OverridesStyleRules<CardSlot, CardProps, Theme>;
  };
  RadCardContent?: {
    defaultProps?: Partial<CardContentProps>;
    styleOverrides?: OverridesStyleRules<
      CardContentSlot,
      CardContentProps,
      Theme
    >;
  };
  RadCardCover?: {
    defaultProps?: Partial<CardCoverProps>;
    styleOverrides?: OverridesStyleRules<CardCoverSlot, CardCoverProps, Theme>;
  };
  RadCardOverflow?: {
    defaultProps?: Partial<CardOverflowProps>;
    styleOverrides?: OverridesStyleRules<
      CardOverflowSlot,
      CardOverflowProps,
      Theme
    >;
  };
  RadCheckbox?: {
    defaultProps?: Partial<CheckboxProps>;
    styleOverrides?: OverridesStyleRules<CheckboxSlot, CheckboxProps, Theme>;
  };
  RadChip?: {
    defaultProps?: Partial<ChipProps>;
    styleOverrides?: OverridesStyleRules<ChipSlot, ChipProps, Theme>;
  };
  RadChipDelete?: {
    defaultProps?: Partial<ChipDeleteProps>;
    styleOverrides?: OverridesStyleRules<
      ChipDeleteSlot,
      ChipDeleteProps,
      Theme
    >;
  };
  RadContainer?: {
    defaultProps?: Partial<ContainerProps>;
    styleOverrides?: OverridesStyleRules<ContainerSlot, ContainerProps, Theme>;
  };
  RadFormHelperText?: {
    defaultProps?: Partial<FormHelperTextProps>;
    styleOverrides?: OverridesStyleRules<
      FormHelperTextSlot,
      FormHelperTextProps,
      Theme
    >;
  };
  RadFormLabel?: {
    defaultProps?: Partial<FormLabelProps>;
    styleOverrides?: OverridesStyleRules<FormLabelSlot, FormLabelProps, Theme>;
  };
  RadIconButton?: {
    defaultProps?: Partial<IconButtonProps>;
    styleOverrides?: OverridesStyleRules<
      IconButtonSlot,
      IconButtonProps,
      Theme
    >;
  };
  RadInput?: {
    defaultProps?: Partial<InputProps>;
    styleOverrides?: OverridesStyleRules<InputSlot, InputProps, Theme>;
  };
  RadLink?: {
    defaultProps?: Partial<LinkProps>;
    styleOverrides?: OverridesStyleRules<LinkSlot, LinkProps, Theme>;
  };
  RadList?: {
    defaultProps: Partial<ListProps>;
    styleOverrides?: OverridesStyleRules<ListSlot, ListProps, Theme>;
  };
  RadListDivider?: {
    defaultProps: Partial<ListDividerProps>;
    styleOverrides?: OverridesStyleRules<
      ListDividerSlot,
      ListDividerProps,
      Theme
    >;
  };
  RadListItem?: {
    defaultProps: Partial<ListItemProps>;
    styleOverrides?: OverridesStyleRules<ListItemSlot, ListItemProps, Theme>;
  };
  RadListItemButton?: {
    defaultProps: Partial<ListItemButtonProps>;
    styleOverrides?: OverridesStyleRules<
      ListItemButtonSlot,
      ListItemButtonProps,
      Theme
    >;
  };
  RadListItemContent?: {
    defaultProps: Partial<ListItemContentProps>;
    styleOverrides?: OverridesStyleRules<
      ListItemContentSlot,
      ListItemContentProps,
      Theme
    >;
  };
  RadListItemDecorator?: {
    defaultProps: Partial<ListItemDecoratorProps>;
    styleOverrides?: OverridesStyleRules<
      ListItemDecoratorSlot,
      ListItemDecoratorProps,
      Theme
    >;
  };
  RadRadio?: {
    defaultProps?: Partial<RadioProps>;
    styleOverrides?: OverridesStyleRules<RadioSlot, RadioProps, Theme>;
  };
  RadRadioGroup?: {
    defaultProps?: Partial<RadioGroupProps>;
    styleOverrides?: OverridesStyleRules<
      RadioGroupSlot,
      RadioGroupProps,
      Theme
    >;
  };
  RadSheet?: {
    defaultProps?: Partial<SheetProps>;
    styleOverrides?: OverridesStyleRules<SheetSlot, SheetProps, Theme>;
  };
  RadSwitch?: {
    defaultProps?: Partial<SwitchProps>;
    styleOverrides?: OverridesStyleRules<SwitchSlot, SwitchProps, Theme>;
  };
  // Temporary for Material UI icons usage
  MuiSvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconSlot, SvgIconProps, Theme>;
  };
  RadSvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconSlot, SvgIconProps, Theme>;
  };
  RadSlider?: {
    defaultProps?: Partial<SliderProps>;
    styleOverrides?: OverridesStyleRules<SliderSlot, SliderProps, Theme>;
  };
  RadTextField?: {
    defaultProps?: Partial<TextFieldProps>;
    styleOverrides?: OverridesStyleRules<TextFieldSlot, TextFieldProps, Theme>;
  };
  RadTypography?: {
    defaultProps?: Partial<TypographyProps>;
    styleOverrides?: OverridesStyleRules<
      TypographySlot,
      TypographyProps,
      Theme
    >;
  };
}
