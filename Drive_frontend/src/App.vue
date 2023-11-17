<template>
  <q-layout view="hHh LpR lff">
    <q-header elevated class="text-white interFaz" id="header" :style="{ 'background-color': colors }">
      <q-toolbar>
        <q-avatar>
          <img
            src="../src/img/logo_sena.png"
            v-if="bd === false && !isMobile"
            style="filter: invert(1)"
            alt=""
          />
        </q-avatar>
        <div>
          <q-btn-dropdown
            flat
            round
            dense
            v-if="!isInLoginComponent && isMobile"
            icon="menu"
            :class="{ 'justify-left': bd === false && isMobile }"
          >
            <q-list padding>
              <q-item clickable v-ripple id="btn" to="/home">
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>
                <q-item-section>Inicio </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/usuarios">
                <q-item-section avatar>
                  <q-icon name="people" />
                </q-item-section>
                <q-item-section> Usuarios</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/programas">
                <q-item-section avatar>
                  <q-icon name="book" />
                </q-item-section>
                <q-item-section> Programas de Formacion </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/ambientes">
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>
                <q-item-section> Ambientes </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/materialesApoyo">
                <q-item-section avatar>
                  <q-icon
                    name="img:https://cdn-icons-png.flaticon.com/512/1556/1556328.png"
                  />
                </q-item-section>
                <q-item-section>Materiales de apoyo</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/redConocimento">
                <q-item-section avatar>
                  <q-icon
                    name="img:https://cdn-icons-png.flaticon.com/512/207/207233.png"
                  />
                </q-item-section>
                <q-item-section> Red de Conocimiento </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/proyectos">
                <q-item-section avatar>
                  <q-icon name="schema" />
                </q-item-section>
                <q-item-section> proyectos </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/registroCalificado">
                <q-item-section avatar>
                  <q-icon
                    name="img:https://cdn-icons-png.flaticon.com/128/4933/4933054.png"
                  />
                </q-item-section>
                <q-item-section> Registro Calificado </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/desarrolloCurricular">
                <q-item-section avatar>
                  <q-icon
                    name="img:https://img.freepik.com/vector-premium/diseno-educativo-desarrollo-curricular-aprendizaje-e-instruccion-vector-diseno-pluma_989823-28.jpg?w=2000"
                  />
                </q-item-section>
                <q-item-section> Desarrollo Curricular </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/guias">
                <q-item-section avatar>
                  <q-icon
                    name="img:https://cdn-icons-png.flaticon.com/512/4345/4345535.png"
                  />
                </q-item-section>
                <q-item-section>Guias de Aprendizaje</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/roles">
                <q-item-section avatar>
                  <q-icon
                    name="img:https://icons.veryicon.com/png/o/education-technology/data-exchange/role-management-13.png"
                  />
                </q-item-section>
                <q-item-section> Roles de Usuario</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/retroalimentacionRed">
                <q-item-section avatar>
                  <q-icon
                    name="img:https://cdn-icons-png.flaticon.com/128/943/943424.png"
                  />
                </q-item-section>
                <q-item-section> Retroalimentacion de Red </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/investigacion">
                <q-item-section avatar>
                  <q-icon name="search" />
                </q-item-section>
                <q-item-section> Investigacion </q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/centroforma">
                <q-item-section avatar>
                  <q-icon name="school" />
                </q-item-section>
                <q-item-section>Centros de Formacion</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/instrumentosEvaluacion">
                <q-item-section avatar>
                  <q-icon name="quiz" />
                </q-item-section>
                <q-item-section> Instrumentos de Evaluacion </q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/niveles">
                <q-item-section avatar>
                  <q-icon
                    name="img:https://th.bing.com/th/id/OIG.PrebEAn_CQD4FAxQMKQ1?pid=ImgGn&w=1024&h=1024&rs=1"
                  />
                </q-item-section>
                <q-item-section>Niveles de Formación</q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable v-ripple to="/">
                <q-item-section avatar>
                  <q-icon name="login" />
                </q-item-section>
                <q-item-section> Salir </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <q-toolbar-title>
        </q-toolbar-title>
        <q-btn flat round dense v-if="!isInLoginComponent" icon="login" @click="useLogin.logout">
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer v-if="!isInLoginComponent && !isMobile" bd=true v-model="drawer" style="background-color: green"
      show-if-above :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true" mini-to-overlay
      :max-width="100" :breakpoint="500" bordered :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }" style="background-color: white">
        <q-list padding>
          <q-item clickable v-ripple id="btn" to="/home">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>Inicio </q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Admin'"
            v-ripple to="/usuarios">
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section> Usuarios</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/niveles">
            <q-item-section avatar>
              <q-icon name="img:https://th.bing.com/th/id/OIG.PrebEAn_CQD4FAxQMKQ1?pid=ImgGn&w=1024&h=1024&rs=1" />
            </q-item-section>
            <q-item-section>Niveles de Formación</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/instructores">
            <q-item-section avatar>
              <q-icon
                name="img:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///8AAAD7+/v+/v78/Pz9/f0BAQH6+vrHx8cjIyNSUlI2NjbLy8vx8fG/v79kZGRzc3Pl5eUwMDCIiIhaWlrq6urz8/PQ0NAsLCyurq6RkZFKSkrCwsLb29s9PT1gYGCpqal2dnaAgICgoKAZGRlra2tMTEwdHR0PDw87OzuLi4ucnJwUFBO3t7eLPqBgAAAVEElEQVR4nN0dCVviOjClYDkEqVwCihyi7qr//+892ibpTJLJ1aL7zLffWnGazCQzmTOBdVnZup1e9dDppOXPtNOpPuh1VJAuB/GB1UBSAdIyrAVN15uZhUBGwWatIt3zmFtyaPGx/6r4rKA2ik6gezIMQ0egmXoj7bGC5KqEwMatoGVoxyj02ltYlJarTFtB99BBLGqe25Y2mSgZdLNolAxiRvNh7ixAEDxWO4TAmKExbBxzR8hVS1t/OJrfJoMhetAgg/7aTEXzX5bBqBXUYK8ySidrh52bEQjoi1n7Cyv9gJpgBKwFTV8C22bRIEXfyKK0j2JSME3URICpFqcmdDS79jebqAmDLfp9phpC8/tMNQ8CM20FY7wJF4H/gJpouosi2F9qqgHYX2qqAVjlzZ/z6E2mWmMZ1AlsRQZtu2jLHr3HhhRP4NXYuQ1TDcAyK4v+gEcfoiY8Lcp/1VTzH9qxVbQkCC2piSgZdMD+S2qiTVOthr2SqRZC4DVMNQhLIPJ/9eidBEaZah4e/XebajUsJrclj14P3ceZaswFa0FTwmJEPPdfBPuDpppXeIMZ176ZR6+t4Pebagj2FyRf7ENfzVS7lpoIRvMfUBNR2SV/NH+bR2+AxVPzv/fodVhM7g+Yau169Dqa+LffY6rVQ6PffiD5EqOCw9jZhEicqRbj0fsg3dyiDBrl3/fodTTbqpPxn4zvMdVqkJaSLy2Zagw/tDL0P2WqsWwzSEb7bs81dAia2ig/aKqxbJQU7Y7q7rp1bd9hqh0L+m6S5IsgMALN1BvpbzHVSgIvFG6t3YWhqYyivvm9Hn3OCUzum5pqeOiWPPoWki85J/BCYdqKDPoTqPFJt8t8YU2rTSCdl0JYUthi4CGqWKWXZRVsu8mXPOHtvtfYVKuHDl/78ddhOLrfnk85S50yGNQWksLwd2npCJXB5fFd4JHMnzgsKQiT8zCgbatub5L3kLfmh5Vp6NpCQr85mfsxEbJSto0NlmWvSUS7ublxA+F2rGVbWyqKQIK592K3S/jD1MaiU4C1gj14SIiHENgTWWOZmj+m2O5L7/zISDUhxQq8RKFoegiAfaGEzbuurfLoc1PnX4wgsOTo0MWIg02SDA+NNZS+/1JsNzeMkiQdM4umbEJj71yV0MkYEyuICHTqwScT5yTJ3kxgR1AYw3bBXDy2Eehtqh0T0+yVZrJRGU0Q7LVa1f+YNqICTLVP3KnEPifMiQmEvR6BnELSMPcPbeV1p6jzpE8U/E8E7Hx12+/fVs324AHSRz/7DwKZcY90ZCgCNbZLbxUCpSBQymgiYA/SdLK1VHtwwqYjMeuLLmXnKwRa3CV2ixYOCNiGGQm8UMhBpoxwl+xRNTdsVlMocVBJIkYxsd3KyKKXlTwRiEzEKk/FIrecfOktRwKHMQYBnhrzksESJMcsWu/rfTPSUh8Wpp2lX/vQNm3W5Wso9CHhivqHLN4JxZWbkdYobD35klYUFjiMCQK7HqZaPY0Hs8WxMyIiNf4FZOpNYGBku6QQaHxmgg0I/K6SRCOQ2zTGmZYaf6ogrSISnXwpKBT6kMwRBUTVmHD3EKu+Z9RMTwTs1DpxDZIvFwqFPrTExvBvtqhaYZiqLFr6FgQrTQTs1E9NhOeICgorXMY9XwLtW9leJ/BAIzIRsNNr5eiBPuzZCfROvmxUhXi2sB3U+O6dMSb5oml8Q/AP/+aObO/r3ab4f2NbFaAt/AkMSpbqGl8P/jFPGZRKLq+DL8nwyUagrvHbMdVqNEmN76prc+Qmluu7+7e3h/k+tyMiPWBBYbsyWICoGt8Yvo2qk5HNlnxRNX5Izs9TZyKNT+WIApIvepMmqHGmpQc8NRPYPPmCNT6RI/Llk+zxNDvclSGt7GtdtGUJcpweP76E74ItXukBT+0ExidfTBqfKvuyq4nlmgfcP4ouxtXzKr3A9qvnwceCaawENX6UmnAmX4DGF9kwquzLqiayjTC/qphMERguQ8FQEJJpztAKYn3YoqkG0NQ1fkThXpf1B8CSGWVFocQxSbZZETc4J7UJIDxhmT4DHnBr3gRGU9WHJlhErpHAfQII5HUS2YVHCy2+gQQKvSeTJJo+bE1N8DnQNL5vXRti0bXY8nlXpSiy3UvRZR8SWDwcGEiAahS2qCY4dorGJybDLoNPmMDi50pQuPjUnP41SGGrGr+pR29AE2t8gp3tJ1/SP5BFq583rCgLuRg0z4a41KInzS9F47dlqsHVRhrft64NWzIzTGD1cCiCUv2Cf/Vkwo7Vq4I0fpAMOnNEvDuo8X3r2jCBt5hFBRmry+eb1EQgF9NqFKjxW5fBygypNX5KTxw1ShGlejemuZLh6aIOZ0TO74kJtpMx72nbakKAGDQ+UddGTOORyuO9lP/MCb2tRBppfBXp5nUyDGn8lIBNzbNXeQh9Uwy/ZkgqY7kR+h1qfI50uwd0dI1P1LUR7tJyEJTUrEs0eA2KrvHj6rtpbSb0oaSQmAxqGo/BqWY+2h+CwhbVBF8HoQ85hcRkUA7vrZEMD0p5MqqjavyWq6lLn2Akhh67V1AlsPseSeBNxaedjrKGYWqiAuk41DXS+I66Ni1kcUwSJ126DPIPtqWA3e6G2+3u8m9mXBVaBouWr07T7f2e2QhEGt9d14anceVBoGWj3YvseXYZLmWeMshB8q/N8IF3tKxAiAM6UOOTG5IyNZyVeiND3YU/pYnYvaVP7FYTBdRytZ/diy6SG9EPGe+CGt+TQIHRR6JQEcCi5cMz6tft0S/z/mYq9bdo7yczgbYst7opo2mUH8uKNI7065DU7/zh7ayQ/shMTZPBAs2nr5nkSsAH881qCZHWg3+ppvENWsdIILtTyFnQa8oxumMDDDL4O0Ntsznt17eq1dXfT2uuBPwwPK3qQCW546oeMKFW9WCuCKDJ+fxieqWJspQf3FdGfoahlUvbKbhysrmra3HBSw/P+8LHTqmNFiRfeh2s8c2Gkc7caWeHhz2zXk4QKJm3L5I2Lnm9YN9N+68viG4Bcj9dP5UhWc/TD2qW22gY6WtfBQvrYQfLXlrxoGXzLHIYKPBGwQ4K7x/HRqr2ftznS85Evgd0oD4kLT99atIdRu22UGivVuyTtxK3B8sKStj+hf8W75jAwbQMm8sIiG8KpdSHnEJLEkx5U1YGcQQ2pcY+WpcnGZYvy8o322QUFbel28I/2B0meTV0eI4IaHytrg3f3oLenCEUeeBlbbdSzxWUu2a22msWfI/Zzh4XAo+YE0hAH6p1beoKwo//IIyq+b3IptVUO1YYlSFiu2tV2mGFHN5vHotNpacgDVbQfZZaz3Lrzkn5MU5+fyKM+FlAUbNNYP8hpvwusbNzMivX+u8jt4obnaWm69rw7S3q2o8wigUDpulKQVqxcdYCo97IRKBk0WQO8yVhHr2eH3Rnuc11bTMF+6LcIs0tLHppE4nRGNsoqL3Pv8zYBx2Sc9e1YY7Xp0arBX6+6MgFxaLVz5X0M9PsLyTqZfR6np32X4+rfClEP9aj12GVLLe5O/1NdlKZ68JaS4JAoTNTgFF2uz6dLjQ9LTJWt7TbIKpGnKU21rWph+S0Ny872AERePk5zLKElMGSQgVp2a575UZAllt5807dEHcLm0df5aOsbHeds9TQA/YlkH+sncka2DQ+p9CsbXudLGuQfGGUDHIKeXNkuQ0fz1RGtGhxTqHGdvnf4+E8vP+87MZNItuWs9Saxjdce4PfrOup+HZjNdXAQ9+0gkF1bTH3GXhkuZW6NjSNExM9FKUTE4sa6toE0v7JFxusO8td7m/0Qa6BKzhT/2XN9FUx1LVxpNu69kbNcpvjXZZpXGw1jqSk82Soptbr2tRVaXyfgTnLrZyGt2Qh02pL9Tn0KI7NIFkJrmvzVxMc1pzlVmLOdj7Ze8hg0WammVbq2kikY3ZRQ12bUQZlI0dZvdgdQ868xwoRzHaokl0apTLeJTWYSN8KkPrCBpXtVNiOoa6NIJAO+tfCSMmglDR1pkGWO8t6adF6Waf8mXbFQyfrigcBkqUuWN6dQeNTK2iRdCaiGlaFeGYGWZFZ7vfBtZr0rGVdm2YlIroJhQw1I6Hx70zbudSHV29klrsSfwuBfFXyneyK4NVnU12nGpfy0DrRsGO8gsiR8bhPhmWnN/soc8NWpp/l9jQBMYgfLMpyq99K5iSw2MGO9lG2hu281vgNsbeDSI1PuaLuA1fl2p/tw+0yjUBQ1xaNvf9kjGlf22MFC5Bn6zQm95nCoprtHtTcMliDco2fUgQyJ4GVmA6tM50MlphAXNcW2WxGlDoZMsutBRNcBAqkd/Y97d1UzyI1/oGFNUfoMpeAqaGuTXVFzQTq146BygUjpQvDpgzq2nSTisjnM0PltbqUa9Gdqa5N87WNBBqiGg8JHkUdf2FAWq9r83F4u6yk0MKie9GdluUmAno2k17qtoEyimqPL3RJr3MdoVy6ssvgUw35R+CQVYj7EWg8EzhQhvtUxs17aFWeNue7u1cxFw93Ye1sUxPJzXMN+SlALp+dN0JAsafmUhMlgSz7xKO8nZVxRefVCp6SukVtpx6mmgabiPuOHHVtqpqo9t8xSkvfJLuPJIETLDinIrD/TaaaDvtkWDOPFUyrEiI4ylndDG7h7JluW7qGqabDms6QETKomOnqHVinlTLKBLKHhcuuvJQDJ4FUsEO9IuprgZi2kgC5i8piGZP5437wAKFg/+hS5yGDnELU12qp6Is9sJfYgZ5pJ9LNFnmjS53XCqIrMcofy86fBI1yAsq7x0stWtxBPCfjYWliSoupVitvta6tdDbgKBuUfHl6TX6izXOVQFTXZsv5CQoFgSPBiXL2/irJl7z/2OdNe3jUHzxgnSC3eWpaQT11aryGWnHXp1yp15VOPCTM0A72zY3jTdS1OW6IXSMCiyD+LSRQhIQbJl/cUfCoMym4cyJcdYIE3hTlM09Y9A+YwLjkC3RZzUg70PQhkKik/8A72KosTYN7250dI68zFuli/lw16hKGmPIAz6lRjuIVOeUH5BMPjUgHJl9kJc+DL4H0CqK6No9bmo9owV4KtVMnF4s/7dqok8lFd/dGpN1oEnVtHlPDzgkgsDxiyNWFWNsH+VKDBCi4sbytFVTKvkjmFsX7fPM8FxleXNb92SULPO1nqSEsuLFcny8PNM1DpyaPXkWktmC48uv0lHhvEqMm1GK8mkK64tfn8CmGNWwyBozmaMHWhXJ9QgQmjVmUoTvZKaQjvsHMb//dQv3OK6CwE5PiUSzlAdQKsrSmUCWwURWZz9QUJzDAsa0qZIG9s6UdI58iBHmqg1PYwiZTE+jYf5cPQOPzowdSXVR/WcSqCbCvi1h3RaGfDDrlldPteHP5Br10fs73CAm8rGvzOpmV6O7TUhDrSSC6vcW9/47foQEzL2GVQtuV7qWEfj3UuL7OZ25weqLOR3ON75wacFrvpvAFDR7VI3PKoGMFxwPQ3VBEmJvJYAniYQPJbbzabfhdkPhOWnH5fHQ5JSLwQmKKu4v/FkGfN3uSwvL/fgWLCqMLh8oyioPAgkXvE6x+5qlxVcLvefV5UzmLkFcZkM4AYrQnRvH8wuclJvCmkkWDVxdCoFLXZlv7FSQwEUGnOVSIewGLp9yznBKzKH/YyvqvcFMNDO1DIL4Q6k0EnYS6qKLgLJZFKQIvsiiXJ0IPKgQ69l/4zR2VsijaBmL011NNeMigNC34UFGmmnROXFNTvbmGQSdeS6p8u8OhgZp4MK5g8TBkgZuMbiU63uRrf4ImzZ7D1kZW0c6sVRkUD6+XPbsJi5YgHlMj+LEcti9gFxCjufbdyb5qgl7Bsl9xsij+mzx9wlV/4bDy2HR2DzDaMmUUH2+ClEFd7OO/c8ArXDWDw3Yk0kOwK4zE7DXYRXfigP5gBwh91VfFjCbhqXmElztcL1S7zage5QzKswZRBC4hgc/SAx6N/4ARLwZcky98dta1FYjAysRz3YW4S6JA5NM4SoipNu8CD3gJpXPe6boZLbqurXxzCoabySP8tboo/sRoPqH6RQS+MuQBLwcgqjD0Q1MhENDn3H/hab09fyfNRN60+lNDNTEvbtIGFBYVXbXq3xLz5XE7mheBsDKRHzUsYdHR2do6jlH0z8XL0h8roxgLUbRWmuG9CDVRwpoJVPffLSjLyQHsC7DHl+otPyGm2rCcyVx0d1/ub8s3MIFzpsdQfVyrrp3AujJR7CnJGzwXvgOyQt7y47GCw2rDG4tPRpWxDQNgwiWOCOj5rL04gX4ZbgthD4B7FxSB5tNnO8iiXTmT1ScHbqqNwel+noQNj3f5bE+911oizhB2DzYDQqSJA5K3cJORoVtx9Y+853UBqz4tZ+6rB7NK8bGBuE0jgjR1/AbcK7RDnTtMNfRVkSDoVF2N876S356UjsExCONBVZOphof28kPqoNNbBx5SBvmMR8PsUTLI4F0pc9YDINlk3Wfw66FAeOM2TAYFmgqBBHPLKV9h2MULH/8QRmBdZPUsBqrz7pjtalnsMLcM6hu4QiDpKk/KAtPRSp2MRbWKHw4CNYxEzlXKIJ18GXNZ3NuCxLTdShCoBzuy1Xr9ZILN1/vHLjGNdL/d9FBgPWU0gXLo8bAAPRkI9LESmZFFPd6UsGJRHDl6vd98MsmZtshG+/Jp8rg0sKhbBpWyr6gUT+whZf4nBYSOqllk0BFibCkL6Zl88e2uzW8RjGPuyKiaC+lmUTUCzZD91ykIcQQ2T75gNFXZJhC5yn0yxu4arWBwXVvcLc1+yRdHd1RJXZypBgKFiFzf/dcI6/ImzEjH18l4ool/89x/EewPyGCIuu4YEYn6zhcPU81Hrq7wLYLtqAlbyOKn1ASHbfky/zgZbJ58YUbmQXVt32aqGXbRmKH9t4ormWohevAaphqExQT+FlMNwGJyf4+pphD4PzHVQjYkVNfmY06063kEbTLu5It1aDvSP3HyRUXax1Sza6gfMNW+SU1YCPwNploN8ktNNQDbrqkWoiaamGq2kCxR9vW/UxNMgaV1Jv/42021qFq1CDRTAumoG2I9vImWPTUfNB2j/AsefYyphruLURM+yZe2WTR6q/h+U61p2DAQzRh7qX1TzVtNRFiUv9RUAyCtqImfTr5Y0aSQ/r969Fp31JvXMtWaBH7jVLBrlP9H8sV+xWwc2xnOR1+ZRWOl4z+20GvifECfHQAAAABJRU5ErkJggg==" />
            </q-item-section>
            <q-item-section> Instructores </q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Instructor' || useLogin.rol === 'Gestor'"
            v-ripple to="/programas">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section> Programas de Formacion</q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Admin' || useLogin.rol === 'Gestor'"
            v-ripple to="/ambientes">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section> Ambientes </q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Gestor'" v-ripple to="/materialesApoyo">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/512/1556/1556328.png" />
            </q-item-section>
            <q-item-section>Materiales de apoyo</q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Admin'" v-ripple to="/redConocimento">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/512/207/207233.png" />
            </q-item-section>
            <q-item-section> Red de Conocimiento </q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Gestor'" v-ripple to="/proyectos">
            <q-item-section avatar>
              <q-icon name="schema" />
            </q-item-section>
            <q-item-section> proyectos </q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Gestor'" v-ripple
            to="/registroCalificado">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/128/4933/4933054.png" />
            </q-item-section>
            <q-item-section> Registro Calificado </q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Gestor'" v-ripple
            to="/desarrolloCurricular">
            <q-item-section avatar>
              <q-icon
                name="img:https://img.freepik.com/vector-premium/diseno-educativo-desarrollo-curricular-aprendizaje-e-instruccion-vector-diseno-pluma_989823-28.jpg?w=2000" />
            </q-item-section>
            <q-item-section> Desarrollo Curricular </q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Gestor'" v-ripple to="/guias">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/512/4345/4345535.png" />
            </q-item-section>
            <q-item-section>Guias de Aprendizaje</q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Admin'" v-ripple to="/roles">
            <q-item-section avatar>
              <q-icon
                name="img:https://icons.veryicon.com/png/o/education-technology/data-exchange/role-management-13.png" />
            </q-item-section>
            <q-item-section> Roles de Usuario</q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Gestor'" v-ripple
            to="/retroalimentacionRed">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/128/943/943424.png" />
            </q-item-section>
            <q-item-section> Retroalimentacion de Red </q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Gestor'" v-ripple to="/investigacion">
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>
            <q-item-section> Investigacion </q-item-section>
          </q-item>

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Admin'" v-ripple to="/centroforma">
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>Centros de Formacion</q-item-section>
          </q-item> 

          <q-item clickable v-if="useLogin.rol === 'Super' || useLogin.rol === 'Gestor'" v-ripple
            to="/instrumentosEvaluacion">
            <q-item-section avatar>
              <q-icon name="quiz" />
            </q-item-section>
            <q-item-section> Instrumentos de Evaluacion </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/configuracion">
            <q-item-section avatar>
              <q-icon name="img:https://cdn-icons-png.flaticon.com/512/2040/2040504.png" />
            </q-item-section>
            <q-item-section> Configuracion </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/materialesforma">
            <q-item-section avatar>
              <q-icon
                name="img:https://cdn-icons-png.flaticon.com/512/2040/2040504.png"
              />
            </q-item-section>
            <q-item-section> Materiales de Formacion </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section> Salir </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useLoginStore } from "./stores/login.js";
import {useconfiguracionStore} from "./stores/configuracion.js"
let Storecolor = useconfiguracionStore();
let drawer = ref(false);
let miniState = ref(true);
let bd = ref(false);
let ron = ref();

let nota = ref(false);
const useLogin = useLoginStore();
let drawerRight = ref(false);
const leftDrawerOpen = ref(false);
const route = useRoute(); // Obtén la información de la ruta actual
const windowWidth = ref(window.innerWidth);

// Calcula si el ancho de la ventana es menor a 300px (para mostrar u ocultar el menú lateral)
const isMobile = computed(() => {
  return windowWidth.value < 600;
});
let colorglobal = ref('');
const colors = ref('');

async function getcolor() {
  try {
    let color = await Storecolor.getColor(useLogin.token);
    colorglobal.value = color.data;

    let cortar = colorglobal.value.map(item => {
      const matches = item.color.match(/\((\d+),(\d+),(\d+)\)/);
      if (matches && matches.length === 4) {
        return `rgb(${matches[1]},${matches[2]},${matches[3]})`;
      } else {
        return ''; 
      }
    });

    let cortado = cortar.filter(item => item !== '').join(',');

    colors.value = cortado;

    console.log(colors.value);
  } catch (error) {
    console.error('Error al obtener colores:', error);
  }
}






function ValidarRol() {
  console.log("Recibiendo el rol: " + useLogin.rol);
  if (useLogin.rol === "Administrador") {
    ron.value = 1;
    console.log("El rol está en  " + ron.value + "  " + useLogin.rol);
  } else if (useLogin.rol === "Gestor") {
    ron.value = 2;
    console.log("El rol está en  " + ron.value + "  " + useLogin.rol);
  } else if (ron.value === 2) {
    return route.path === "/programas";
  } else if (useLogin.rol === "Instructor") {
    ron.value = 3;
    console.log("El rol está en  " + ron.value + "  " + useLogin.rol);
  } else if (useLogin.rol === "Super") {
    ron.value = 0;
    console.log("El rol está en  " + ron.value + "  " + useLogin.rol);
  }
}

// Función para ejecutar el ciclo de ValidarRol automáticamente
function ejecutarCiclo() {
  const intervalId = setInterval(() => {
    if (useLogin.rol === "") {
      ValidarRol();
      console.log(ron.value);
    } else {
      clearInterval(intervalId);
      ejecutarCiclo(); // Reiniciar el ciclo si useLogin.rol todavía está vacío
    }
  }, 1000); // Ejecutar cada 1 segundo
}

ejecutarCiclo();

// Función para abrir/cerrar el menú lateral
const toggleDrawer = () => { 
  drawer.value = !drawer.value;
};

// Agrega un listener para detectar cambios en el ancho de la ventana
window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

// Cierra el menú lateral cuando se carga la página en dispositivos móviles
onMounted(async() => {
  console.log(ValidarRol());
  if (isMobile.value) {
    drawer.value = false;
  }
 await getcolor();

});

// Observa cambios en el valor de isMobile para cerrar el menú lateral si es necesario
watch(isMobile, (newValue) => {
  if (newValue) {
    drawer.value = false;
  }
});

// Calcula si estás en el componente de inicio de sesión
const isInLoginComponent = computed(() => {
  return route.path === "/"; // La ruta del componente Login
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped>
/* Estilo del botón de hamburguesa en dispositivos móviles */
.q-btn.is-mobile {
  display: block;
  margin: 10px;
  /* Ajusta el margen según tus necesidades */
}

/* Estilo del menú lateral en dispositivos móviles */
.q-drawer.is-mobile {
  width: 100%;
  max-width: 100%;
}
.interFaz{
  background-color: v-bind(colors);
}
#text {
  font-size: 20px;
  font-family: cursive;
}

#btnlat {
  margin-left: 5px;
  margin-top: 5px;
  filter: invert(100);
}

#avatar {
  height: 30px;
  width: 60px;
  filter: invert(1);
}

#avarat2 {
  width: 70px;
}

#lateral {
  background-color: green;
  font-family: cursive;
}

#header {
  background-color: var(--header-background-color);
  font-family: cursive;
}
:root {
  --header-background-color: {{ rgbColor  }};
}

/*botones */
#vende {
  display: flex;
  background-color: rgb(255, 255, 255);

  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}

#vende:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.779);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

#vehicu {
  display: flex;

  color: white;
  font-size: 20px;
  margin-top: 10px;
  font-family: cursive;
  text-align: center;
  border-radius: 10px;
}

#vehicu:hover {
  transform: scale(1.1);

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.626);
}

.custom-link {
  text-decoration: none;
  /* Eliminar subrayado */
  color: black;
}

#logout {
  width: 70%;
}
</style>
