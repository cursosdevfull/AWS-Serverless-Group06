import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsRFC3339,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  doctor: string;

  @IsNotEmpty()
  @IsString()
  clinica: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @IsEnum(["PE", "CO", "MX"])
  countryIso: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(["APP_WEB", "APP_MOBILE", "APP_WEB_INTRANET", "BOT_WHATSAPP"])
  origin: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(["CORE_PE", "CORE_CO", "CORE_MX"])
  destination: string;

  @IsNotEmpty()
  @IsString()
  @IsRFC3339()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  specialtyId: number;
}
