import AccountCircle from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import HouseIcon from "@mui/icons-material/House";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import TitleIcon from '@mui/icons-material/Title';
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import WorkIcon from "@mui/icons-material/Work";
import PinIcon from "@mui/icons-material/Pin";
import SummarizeIcon from "@mui/icons-material/Summarize";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Box, TextField } from '@mui/material';
import React from 'react';
import "./components.css"


const FieldWithIcon = ({
  margin,
  icon,
  label,
  name,
  touchedFields,
  dirtyFields,
  errors,
  register,
  required,
  disabled,
  value,
  readOnly,
  defaultValue,
  multiline,
  rows,
  width,
  variant,
  marginBottom,
  pattern,
  maxWidth,
  InputProps,
  validate,
  type,
}) => {
  const icons = {
    AccountCircle: AccountCircle,
    BadgeIcon: BadgeIcon,
    EmailIcon: EmailIcon,
    LockIcon: LockIcon,
    LocationSearchingIcon: LocationSearchingIcon,
    summarize: SummarizeIcon,
    bookmarks: BookmarksIcon,
    ContactPhoneIcon: ContactPhoneIcon,
    ContactEmergencyIcon: ContactEmergencyIcon,
    LocationCityIcon: LocationCityIcon,
    HouseIcon: HouseIcon,
    PinIcon: PinIcon,
    InsertInvitationIcon: InsertInvitationIcon,
    HomeIcon: HomeIcon,
    WorkIcon:WorkIcon,
    TitleIcon:TitleIcon,
    InsertLinkIcon:InsertLinkIcon
  };
  const IconComponent = icons[icon];
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      {IconComponent && (
        <IconComponent
          sx={{             
            mr: 1,
            my: 0.5,
            marginBottom: marginBottom
          }}
          className={errors?.[name] ||
                (touchedFields?.[name] && !dirtyFields?.[name])
                ? "error"
                : "textPrimary"}
        />
      )}
      <TextField
        sx={{
          marginTop: margin,
          width: width,
          maxWidth:maxWidth,
          "& .MuiFormLabel-root.Mui-focused": {
            color:
              (touchedFields?.[name] && !dirtyFields?.[name]) ||
                errors?.[name]
                ? "red"
                : " #088b89",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor:
              (touchedFields?.[name] && !dirtyFields?.[name]) ||
                errors?.[name]
                ? "red"
                : " #088b89",
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor:
                (touchedFields?.[name] &&
                  !dirtyFields?.[name]) ||
                  errors?.[name]
                  ? "red"
                  : " #088b89",
            },
          },
        }}
        {...register(name, {
          required: required ,
          pattern: pattern,
          validate:validate
        })}
        error={
          (touchedFields?.[name] && !dirtyFields?.[name]) ||
          errors?.[name]
        }
        id="standard-number"
        label={label}
        type={type}
        variant={variant}
        readOnly={readOnly}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        multiline={multiline}
        rows={rows}
        InputProps={InputProps}
      />
    </Box>

  );
};

export default FieldWithIcon;