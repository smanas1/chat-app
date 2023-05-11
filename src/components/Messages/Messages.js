import React from "react";
import "./messages.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import SendIcon from "@mui/icons-material/Send";
import { BiMicrophone } from "react-icons/bi";
import { Divider, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Button from "@mui/material/Button";

const Messages = () => {
  const actions = [
    { icon: <AiOutlineCamera />, name: "Camera" },
    { icon: <BiMicrophone />, name: "Voice" },
    { icon: <AiOutlineLink />, name: "File" },
  ];
  return (
    <div className="messages-wrapper">
      {/* Message Top */}
      <div className="message-top">
        <div className="top-info">
          <div className="top-img">
            <picture>
              <img src="../img/avatar-login.webp" alt="" />
            </picture>
          </div>
          <div className="top-content">
            <h2>User</h2>
            <p>Online</p>
          </div>
        </div>
        <div className="top-btns">
          <BsThreeDotsVertical />
        </div>
      </div>
      <Divider />
      {/* Messages */}
      <div className="messages">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
        natus ducimus quo, id distinctio blanditiis earum minus corporis nam
        laudantium quidem veritatis saepe, corrupti assumenda laboriosam, sint
        velit doloremque voluptate autem fugit repudiandae aliquam. Blanditiis
        aliquam aut inventore magnam repudiandae fuga saepe illo porro ipsum,
        architecto dignissimos est nostrum corporis delectus modi velit atque
        provident! Voluptates inventore voluptatibus ullam nihil eveniet,
        laborum dicta reiciendis quae, ea et deleniti officia quibusdam earum
        quam sunt? Illo minima ullam iure saepe voluptate eos hic temporibus
        architecto aliquid voluptatem? Sint totam itaque, harum saepe alias est
        illum. Voluptatem aliquid ut quam delectus similique quasi, repellendus
        autem, aliquam excepturi expedita sunt dolore distinctio, blanditiis
        tenetur reprehenderit dolores in ea consequatur veritatis iusto
        consectetur ipsum laboriosam reiciendis! Commodi aliquid facilis odit
        ratione neque magnam repudiandae, sint placeat eveniet reprehenderit
        voluptatum quaerat voluptatibus ea voluptatem eaque excepturi amet
        mollitia, ipsam tempore aut libero repellendus nisi laudantium deserunt!
        Molestias blanditiis natus qui repellat, veritatis illum dicta non
        molestiae nihil ad ex culpa, animi, iure quae. Recusandae dolores ex ea
        aut rerum explicabo quia, blanditiis cum, odio reprehenderit ratione
        officiis, consectetur asperiores modi a tempora vel! Veniam quam iusto
        ipsa recusandae repellat laborum esse incidunt neque, ad nisi unde
        voluptate non dolorum quae officiis nihil harum fugiat aliquam ullam
        distinctio cum quas sint. Consequatur fugit impedit sint, non nemo
        deleniti aut est eaque? Deleniti voluptatum consequatur modi repellat.
        Sunt, error, iure ex dolore necessitatibus aliquid porro omnis accusamus
        explicabo tenetur sint veritatis quia placeat possimus atque eos labore
        voluptates nisi laboriosam iusto reiciendis. Non labore architecto
        eaque. Saepe, nam voluptate? Ea illum facere quo autem numquam,
        quibusdam, facilis nobis a iusto nisi labore ratione eos harum fugit aut
        quae ipsam molestiae minima voluptatum quis dolorum. Fuga impedit ab
        eligendi, velit omnis voluptatibus ipsam labore pariatur neque voluptate
        placeat iusto quisquam adipisci doloribus ipsum, quam officiis sit
        illum! Hic, repellat cum? Quibusdam, labore vero cupiditate distinctio
        doloribus totam id! Temporibus dolor nostrum illum ad ullam nobis
        inventore saepe, placeat at iste ratione laudantium aut labore alias
        maiores sit itaque accusamus pariatur iusto doloribus dignissimos
        perspiciatis, praesentium eveniet? Quo distinctio, quas nesciunt
        voluptatem tempora accusantium delectus quam eveniet consectetur facilis
        perspiciatis placeat ullam facere qui reiciendis a voluptatum obcaecati,
        deleniti impedit sit dignissimos iste officiis vitae omnis. Laboriosam
        aspernatur quo consequuntur et iure corporis quidem culpa ad itaque vel,
        quae voluptatem, odio deserunt eligendi amet porro ipsam saepe nemo
        illo? Vero, necessitatibus. Veniam quibusdam doloribus, harum fugit
        neque optio error odit non minus adipisci consequuntur atque tempore
        ipsam omnis officia nemo commodi ratione nihil ab odio! Laboriosam
        corporis beatae obcaecati repellendus architecto sint autem dolorem,
        explicabo modi aspernatur! Illum voluptate dignissimos ratione debitis.
        Perspiciatis repellendus est ea rem molestiae, perferendis facilis
        tempore iusto labore in aspernatur ducimus sapiente molestias dolorum,
        repudiandae natus expedita aut quia error! Minus corrupti consequuntur
        cum ratione consequatur porro. Doloremque explicabo id dicta quam
        cumque! Vitae saepe odit placeat error aliquid nisi fuga ipsam facere
        odio voluptatibus ea blanditiis, voluptate, distinctio maiores a
        molestiae similique eaque libero assumenda maxime? Quis, illo autem esse
        porro ab ex nulla earum ipsam error beatae quibusdam quos aliquam odit
        tempora non magnam quo maiores officia? Eius rem voluptatem veniam
        aliquam incidunt mollitia doloribus perferendis rerum illo recusandae
        consequatur blanditiis explicabo quasi sapiente deleniti ex ut beatae
        fugit, laudantium dolor cum corporis sunt dolorum alias? Eos, animi
        dolorum, reiciendis eum ipsa optio sequi facilis, quis architecto dolor
        eligendi sunt impedit quia est fuga dolores! Nihil nam dolore architecto
        exercitationem voluptatum! Repellendus debitis id sunt reiciendis
        nesciunt, et sed aliquid voluptatum provident fugit repellat, ducimus
        quidem, tempore accusantium neque placeat atque quaerat? Suscipit
        laudantium assumenda, quisquam obcaecati tempore voluptate repellendus
        inventore a error earum mollitia ipsum reprehenderit maxime illum.
        Minima recusandae suscipit molestias quia maxime porro ipsa? Illum
        ducimus eaque quos ex doloribus totam provident numquam quod, ad magni
        odio recusandae, explicabo ea eveniet. Temporibus deleniti, incidunt
        ratione illo aspernatur enim repudiandae voluptates, recusandae ad
        impedit earum accusamus facilis dolores quas nostrum et itaque culpa
        neque inventore exercitationem corporis. Reiciendis nostrum culpa
        reprehenderit veritatis beatae alias assumenda eos quas molestiae nobis
        maxime soluta nulla porro ab voluptate incidunt, a laboriosam autem
        neque qui. Dolorem aperiam exercitationem voluptatibus est provident
        inventore, maiores nihil necessitatibus consectetur laborum excepturi
        molestias voluptates illo vero dolor itaque blanditiis. Porro, aut
        tenetur aliquam, alias quo ex dolorem dolore ducimus quam quod veritatis
        explicabo? Dignissimos fuga modi vel veniam dolores quas architecto,
        eligendi totam odit, in nihil deserunt delectus aut aspernatur debitis
        qui sint consequatur minus repellendus corrupti voluptatum laboriosam
        voluptatem, provident dolorum. Cumque non accusantium ipsa temporibus,
        aperiam nostrum! Recusandae nulla, illo facilis cumque sapiente minima
        ad aperiam consequuntur veniam omnis explicabo tempora provident odio
        voluptate doloribus adipisci eum aspernatur in similique quisquam!
        Assumenda ipsa labore, esse dolor facere, sed illo placeat voluptatibus
        soluta minus eveniet. Cumque eos aperiam alias vero a asperiores
        repellendus reiciendis iste consectetur, dicta ipsum provident hic,
        accusamus officiis, cum doloribus. Praesentium, odio sequi commodi
        officia libero quis, adipisci consectetur aliquam eum explicabo, eveniet
        nemo voluptates? Voluptas aperiam explicabo eius molestiae dolore
        reiciendis necessitatibus facilis porro quod accusamus nihil culpa ipsa
        maxime eum tempora perferendis, nulla magnam quibusdam id. Ipsum veniam
        totam illo mollitia architecto error, odit, sequi maxime delectus ipsa,
        omnis eveniet beatae ipsam magni vero eaque ullam tempora fugiat? Iusto
        culpa, quas sunt nemo quisquam animi et vero maxime saepe tenetur dicta
        ratione ipsum beatae. Sed rem debitis placeat maiores ratione quod,
        optio ex, cumque, corporis voluptatem distinctio doloremque. Debitis
        aliquam odit alias quas libero qui dolore! Voluptate, vitae et. Nam
        velit ullam tempore molestias? Nemo culpa optio consequatur laborum.
        Explicabo odit saepe illum expedita neque culpa laboriosam placeat,
        officiis blanditiis hic molestias eos iure animi accusantium nostrum
        esse cumque omnis ad! Tempore, nostrum enim! Sapiente distinctio odio
        autem adipisci maiores hic eaque illum itaque velit! Voluptates itaque
        obcaecati maxime nisi magni, consequuntur quod veniam voluptatibus
        veritatis aliquam iste. Ratione quam eligendi pariatur repudiandae
        similique eveniet eaque unde ut minus ab reprehenderit, voluptatum sunt
        eum debitis officiis atque nisi numquam! Dolor, perferendis illum?
      </div>
      {/* Messages Bottom */}
      <Divider />
      <div className="message-bottom">
        <div className="message-center">
          <div className="message-inputs">
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              type="text"
              variant="filled"
              placeholder="Message"
              fullWidth
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <SpeedDial
                      className="speeddile"
                      ariaLabel="SpeedDial basic example"
                      sx={{
                        position: "absolute",
                        bottom: 9,
                        right: 16,
                        width: "30px",
                      }}
                      icon={<SpeedDialIcon />}
                    >
                      {actions.map((action) => (
                        <SpeedDialAction
                          className="speeddial-action"
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                        />
                      ))}
                    </SpeedDial>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="send-btn">
            <Button variant="contained">
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
